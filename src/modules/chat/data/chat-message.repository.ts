import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from 'src/common/entities/chat-message';
import { ChatMessageDao } from 'src/common/dao/chat-message.dao';
import { CreateChatMessageDto } from 'src/modules/chat/dto/create-chat-message.dto';
import { UpdateChatMessageDto } from 'src/modules/chat/dto/update-chat-message.dto';

@Injectable()
export class ChatMessageRepository {
  constructor(
    @InjectRepository(ChatMessageDao)
    private readonly chatMessageRepository: Repository<ChatMessageDao>,
  ) {}

  findById(messageId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findOne({
      where: { id: messageId },
      relations: ['room', 'user'],
    });
  }

  async findNotReadedAmountByRoomId(roomId: string): Promise<number> {
    return this.chatMessageRepository
      .createQueryBuilder('message')
      .where('message.room_id = :roomId', { roomId })
      .andWhere('message.readedAt IS NULL')
      .getCount();
  }

  findManyByRoomId(roomId: string): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: { roomId },
      order: {
        createdAt: 'DESC',
      },
      take: 150,
      relations: ['room', 'user'],
    });
  }

  findLastByRoomId(roomId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findOne({
      where: { roomId },
      order: { createdAt: 'DESC' },
      relations: ['user', 'room'],
    });
  }

  create(payload: CreateChatMessageDto): Promise<ChatMessage> {
    const message = this.chatMessageRepository.create(payload);
    return this.chatMessageRepository.save(message);
  }

  async update(messageId: string, payload: UpdateChatMessageDto) {
    await this.chatMessageRepository.update(messageId, payload);

    return this.chatMessageRepository.findOne({
      where: { id: messageId },
      relations: ['room', 'user'],
    });
  }

  async softDeleteAndFetch(messageId: string): Promise<ChatMessage> {
    await this.chatMessageRepository.softDelete(messageId);

    return this.chatMessageRepository.findOne({
      where: { id: messageId },
      withDeleted: true,
    });
  }
}
