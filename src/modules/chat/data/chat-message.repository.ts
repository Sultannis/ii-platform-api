import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from 'src/common/entities/chat-message';
import { ChatMessageDao } from 'src/common/dao/chat-message.dao';
import { CreateChatMessageDto } from 'src/modules/chat/dto/create-chat-message.dto';
import { UpdateChatMessageDto } from 'src/modules/chat/dto/update-chat-message.dto';
import { mapChatMessageDaoToEntity } from 'src/common/mappers/chat.mappers';

@Injectable()
export class ChatMessageRepository {
  constructor(
    @InjectRepository(ChatMessageDao)
    private readonly chatMessageRepository: Repository<ChatMessageDao>,
  ) {}

  async findById(messageId: string): Promise<ChatMessage | null> {
    const chatMessage = await this.chatMessageRepository.findOne({
      where: { id: messageId },
      relations: ['room', 'user'],
    });

    return chatMessage ? mapChatMessageDaoToEntity(chatMessage) : null;
  }

  async findNotReadedAmountByRoomId(roomId: string): Promise<number> {
    return this.chatMessageRepository
      .createQueryBuilder('message')
      .where('message.room_id = :roomId', { roomId })
      .andWhere('message.readedAt IS NULL')
      .getCount();
  }

  async findManyByRoomId(
    roomId: string,
    page = 1,
    perPage = 50,
  ): Promise<[ChatMessage[], number]> {
    const offset = (page - 1) * perPage;
    const [chatMessages, total] = await this.chatMessageRepository.findAndCount(
      {
        where: { roomId },
        order: {
          createdAt: 'DESC',
        },
        take: perPage,
        skip: offset,
        relations: ['room', 'user'],
      },
    );

    return [chatMessages.map(mapChatMessageDaoToEntity), total];
  }

  async findLastByRoomId(roomId: string): Promise<ChatMessage | null> {
    const chatMessage = await this.chatMessageRepository.findOne({
      where: { roomId },
      order: { createdAt: 'DESC' },
      relations: ['user', 'room'],
    });
    return chatMessage ? mapChatMessageDaoToEntity(chatMessage) : null;
  }

  async create(payload: CreateChatMessageDto): Promise<ChatMessage | null> {
    const message = this.chatMessageRepository.create(payload);
    const chatMessageDao = await this.chatMessageRepository.save(message);

    return chatMessageDao ? mapChatMessageDaoToEntity(chatMessageDao) : null;
  }

  async update(messageId: string, payload: UpdateChatMessageDto) {
    await this.chatMessageRepository.update(messageId, payload);

    const updatedMessage = await this.chatMessageRepository.findOne({
      where: { id: messageId },
      relations: ['room', 'user'],
    });

    return updatedMessage ? mapChatMessageDaoToEntity(updatedMessage) : null;
  }

  async softDeleteAndFetch(messageId: string): Promise<ChatMessage | null> {
    await this.chatMessageRepository.softDelete(messageId);

    const deletedChatMessage = await this.chatMessageRepository.findOne({
      where: { id: messageId },
      withDeleted: true,
    });

    return deletedChatMessage
      ? mapChatMessageDaoToEntity(deletedChatMessage)
      : null;
  }
}
