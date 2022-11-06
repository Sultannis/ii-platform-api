import { Injectable } from '@nestjs/common';
import { ChatMessage } from 'src/common/entities/chat-message';
import { ChatMessageRepository } from 'src/modules/chat/data/chat-message.repository';
import { CreateChatMessageDto } from 'src/modules/chat/dto/create-chat-message.dto';
import { UpdateChatMessageDto } from 'src/modules/chat/dto/update-chat-message.dto';

@Injectable()
export class ChatMessageService {
  constructor(private readonly chatMessageRepository: ChatMessageRepository) {}

  findById(messageId: string): Promise<ChatMessage | null> {
    return this.chatMessageRepository.findById(messageId);
  }

  findNotReadedAmountByRoomId(roomId: string): Promise<number> {
    return this.chatMessageRepository.findNotReadedAmountByRoomId(roomId);
  }

  findManyByRoomId(
    roomId: string,
    page = 1,
    perPage = 50,
  ): Promise<[ChatMessage[], number]> {
    return this.chatMessageRepository.findManyByRoomId(roomId, page, perPage);
  }

  findLastByRoomId(roomId: string): Promise<ChatMessage> {
    return this.chatMessageRepository.findLastByRoomId(roomId);
  }

  create(payload: CreateChatMessageDto): Promise<ChatMessage> {
    return this.chatMessageRepository.create(payload);
  }

  async update(
    messageId: string,
    payload: UpdateChatMessageDto,
  ): Promise<ChatMessage | null> {
    const chatMessage = await this.chatMessageRepository.findById(messageId);
    if (!chatMessage) {
      return null;
    }

    return this.chatMessageRepository.update(messageId, payload);
  }

  async remove(messageId: string): Promise<ChatMessage | null> {
    const chatMessage = await this.chatMessageRepository.findById(messageId);
    if (!chatMessage) {
      return null;
    }

    return this.chatMessageRepository.softDeleteAndFetch(messageId);
  }
}
