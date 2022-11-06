import { Injectable } from '@nestjs/common';
import { ChatRoomParticipant } from 'src/common/entities/chat-room-participant';

@Injectable()
export class ChatRoomParticipantResource {
  convert(payload: ChatRoomParticipant) {
    const { user, room } = payload;

    return {
      id: payload.id,
      created_at: payload.createdAt,
      updated_at: payload.updatedAt,
      deleted_at: payload.deletedAt,
      user: user
        ? {
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            role: user.role,
            avatar_url: user.avatarUrl,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
            deleted_at: user.deletedAt,
          }
        : null,
      room: room
        ? {
            id: room.id,
            room_admin_id: room.roomAdminId,
            name: room.name,
            type: room.type,
            created_at: room.createdAt,
            updated_at: room.updatedAt,
            deleted_at: room.deletedAt,
          }
        : null,
    };
  }
}
