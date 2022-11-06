import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoomParticipantDao } from 'src/common/dao/chat-room-participant.dao';
import { CreateChatParticipantDto } from 'src/modules/chat/dto/create-chat-participant.dto';
import { ChatRoomParticipant } from 'src/common/entities/chat-room-participant';

@Injectable()
export class ChatRoomParticipantRepository {
  constructor(
    @InjectRepository(ChatRoomParticipantDao)
    private readonly chatRoomParticipantRepository: Repository<ChatRoomParticipantDao>,
  ) {}

  async findByRoomId(roomId: string): Promise<ChatRoomParticipant[]> {
    const participants = await this.chatRoomParticipantRepository.find({
      where: { roomId },
      relations: ['user', 'room'],
    });

    return participants;
  }

  async findOne(userId: number, roomId: string) {
    const chatRoomParticipant =
      await this.chatRoomParticipantRepository.findOne({
        where: { userId, roomId },
        relations: ['user', 'room'],
      });

    return chatRoomParticipant;
  }

  async create(payload: CreateChatParticipantDto) {
    const participant = this.chatRoomParticipantRepository.create(payload);
    const { id } = await this.chatRoomParticipantRepository.save(participant);

    const chatRoomParticipant =
      await this.chatRoomParticipantRepository.findOne({
        where: { id },
        relations: ['user', 'room'],
      });

    return chatRoomParticipant;
  }
}
