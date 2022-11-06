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

  async findByRoomId(roomId: string): Promise<ChatRoom[] | null> {
    const chatRooms = await this.chatRoomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participant')
      .innerJoinAndSelect('participant.user', 'user')
      .where('participant.room_id = :roomId', { roomId })
      .getMany();

    return chatRooms ? chatRooms : null;
  }

  findByUserId(userId: number): Promise<ChatRoom[]> {
    return this.chatRoomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participant')
      .innerJoinAndSelect('participant.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  findById(roomId: string): Promise<ChatRoom> {
    return this.chatRoomRepository.findOne({
      where: { id: roomId },
    });
  }

  async validateUserAccess(userId: number, roomId: string): Promise<boolean> {
    const chatRoom = await this.chatRoomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participant')
      .innerJoinAndSelect('participant.user', 'user')
      .where('participant.room_id = :roomId')
      .andWhere('user.id = :userId')
      .setParameters({ userId, roomId })
      .getOne();

    return chatRoom !== null;
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
