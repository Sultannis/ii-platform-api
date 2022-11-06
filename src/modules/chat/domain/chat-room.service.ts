import { Injectable } from '@nestjs/common';
import { ChatRoom } from 'src/common/entities/chat-room';
import { ChatRoomRepository } from 'src/modules/chat/data/chat-room.repository';
import { UpdateChatRoomDto } from 'src/modules/chat/dto/update-chat-room-dto';
import { CreateChatRoomDto } from 'src/modules/chat/dto/create-chat-room.dto';
import { ChatMessageService } from './chat-message.service';

@Injectable()
export class ChatRoomService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly chatMessageService: ChatMessageService,
  ) {}

  async findByUserId(userId: number): Promise<ChatRoom[]> {
    const chatRooms = await this.chatRoomRepository.findByUserId(userId);
    for (const room of chatRooms) {
      room.lastMessage = await this.chatMessageService.findLastByRoomId(
        room.id,
      );
      room.notReadedMessagesAmount =
        await this.chatMessageService.findNotReadedAmountByRoomId(room.id);
    }

    return chatRooms;
  }

  validateUserAccess(userId: number, roomId: string): Promise<boolean> {
    return this.chatRoomRepository.validateUserAccess(userId, roomId);
  }

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
