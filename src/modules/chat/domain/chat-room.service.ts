import { Injectable } from '@nestjs/common';
import { ChatRoom } from 'src/common/entities/chat-room';
import { ChatRoomRepository } from 'src/modules/chat/data/chat-room.repository';
import { UpdateChatRoomDto } from 'src/modules/chat/dto/update-chat-room-dto';
import { CreateChatRoomDto } from 'src/modules/chat/dto/create-chat-room.dto';

@Injectable()
export class ChatRoomService {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}

  findById(roomId: string): Promise<ChatRoom | null> {
    return this.chatRoomRepository.findById(roomId);
  }

  create(payload: CreateChatRoomDto): Promise<ChatRoom> {
    return this.chatRoomRepository.create(payload);
  }

  async update(
    roomId: string,
    payload: UpdateChatRoomDto,
  ): Promise<ChatRoom | null> {
    const chatRoom = await this.chatRoomRepository.findById(roomId);
    if (!chatRoom) {
      return null;
    }

    return this.chatRoomRepository.update(roomId, payload);
  }

  async remove(roomId: string): Promise<ChatRoom | null> {
    const chatRoom = await this.chatRoomRepository.findById(roomId);
    if (!chatRoom) {
      return null;
    }

    return this.chatRoomRepository.softDeleteAndFetch(roomId);
  }
}
