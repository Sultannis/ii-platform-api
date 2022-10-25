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

  async findById(roomId: string): Promise<ChatRoom | null> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: roomId },
      relations: ['message'],
    });

    return chatRoom ? mapChatRoomDaoToEntity(chatRoom) : null;
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
