import { ConflictException, Injectable } from '@nestjs/common';
import { ChatRoomParticipantRepository } from 'src/modules/chat/data/chat-room-participant.repository';
import { CreateChatParticipantDto } from 'src/modules/chat/dto/create-chat-participant.dto';

@Injectable()
export class ChatRoomParticipantService {
  constructor(
    private readonly chatRoomParticipantRepository: ChatRoomParticipantRepository,
  ) {}

  findByRoomId(roomId: string) {
    return this.chatRoomParticipantRepository.findByRoomId(roomId);
  }

  findOne(userId: number, roomId: string) {
    return this.chatRoomParticipantRepository.findOne(userId, roomId);
  }

  async findAmountByRoomId(roomId: string) {
    const participants = await this.chatRoomParticipantRepository.findByRoomId(
      roomId,
    );
    return participants.length;
  }

  async create({ userId, roomId }: CreateChatParticipantDto) {
    const participant = await this.chatRoomParticipantRepository.findOne(
      userId,
      roomId,
    );

    if (participant) {
      throw new ConflictException(
        'Participant with provided user and room already exists',
      );
    }

    return this.chatRoomParticipantRepository.create({ userId, roomId });
  }
}
