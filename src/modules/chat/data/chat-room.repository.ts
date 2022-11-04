import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'src/common/entities/chat-room';
import { ChatRoomDao } from 'src/common/dao/chat-room.dao';
import { CreateChatRoomDto } from 'src/modules/chat/dto/create-chat-room.dto';
import { UpdateChatRoomDto } from 'src/modules/chat/dto/update-chat-room-dto';

@Injectable()
export class ChatRoomRepository {
  constructor(
    @InjectRepository(ChatRoomDao)
    private readonly chatRoomRepository: Repository<ChatRoomDao>,
  ) {}

  findByUserId(userId: number): Promise<ChatRoom[]> {
    return this.chatRoomRepository
      .createQueryBuilder('room')
      .where(':userId = ANY(room.users_access)', { userId })
      .getMany();
  }

  findById(roomId: string): Promise<ChatRoom> {
    return this.chatRoomRepository.findOne({
      where: { id: roomId },
    });
  }

  create(payload: CreateChatRoomDto): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create(payload);
    return this.chatRoomRepository.save(chatRoom);
  }

  async update(roomId: string, payload: UpdateChatRoomDto) {
    await this.chatRoomRepository.update(roomId, payload);

    return this.chatRoomRepository.findOne({
      where: { id: roomId },
      relations: ['message'],
    });
  }

  async softDeleteAndFetch(roomId: string): Promise<ChatRoom> {
    await this.chatRoomRepository.softDelete(roomId);

    return this.chatRoomRepository.findOne({
      where: { id: roomId },
      withDeleted: true,
    });
  }
}
