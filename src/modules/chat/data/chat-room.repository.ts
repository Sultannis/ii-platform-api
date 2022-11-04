import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'src/common/entities/chat-room';
import { ChatRoomDao } from 'src/common/dao/chat-room.dao';
import { CreateChatRoomDto } from 'src/modules/chat/dto/create-chat-room.dto';
import { mapChatRoomDaoToEntity } from 'src/common/mappers/chat.mappers';
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

    return chatRooms ? chatRooms.map(mapChatRoomDaoToEntity) : null;
  }

  async findByUserId(userId: number): Promise<ChatRoom[] | null> {
    const chatRooms = await this.chatRoomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participant')
      .innerJoinAndSelect('participant.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return chatRooms ? chatRooms.map(mapChatRoomDaoToEntity) : null;
  }

  async findById(roomId: string): Promise<ChatRoom | null> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: roomId },
    });

    return chatRoom ? mapChatRoomDaoToEntity(chatRoom) : null;
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

  async create(payload: CreateChatRoomDto): Promise<ChatRoom | null> {
    const chatRoom = this.chatRoomRepository.create(payload);
    const chatRoomDao = await this.chatRoomRepository.save(chatRoom);

    return chatRoomDao ? mapChatRoomDaoToEntity(chatRoomDao) : null;
  }

  async update(roomId: string, payload: UpdateChatRoomDto) {
    await this.chatRoomRepository.update(roomId, payload);

    const updatedChatRoom = await this.chatRoomRepository.findOne({
      where: { id: roomId },
      relations: ['message'],
    });

    return updatedChatRoom ? mapChatRoomDaoToEntity(updatedChatRoom) : null;
  }

  async softDeleteAndFetch(roomId: string): Promise<ChatRoom | null> {
    await this.chatRoomRepository.softDelete(roomId);

    const deletedChatRoom = await this.chatRoomRepository.findOne({
      where: { id: roomId },
      withDeleted: true,
    });

    return deletedChatRoom ? mapChatRoomDaoToEntity(deletedChatRoom) : null;
  }
}
