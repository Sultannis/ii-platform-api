import { ChatRoomParticipantResource } from './chat-room-participant.resource';
import { ChatRoom } from 'src/common/entities/chat-room';

export class ChatRoomResource {
  constructor(
    private readonly chatRoomParticipantResource: ChatRoomParticipantResource,
  ) {}

  convert(payload: ChatRoom) {
    return {
      id: payload.id,
      name: payload.name,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      deletedAt: payload.deletedAt,
      backgroundColor: payload.backgroundColor,
      notReadedMessagesAmount: payload.notReadedMessagesAmount ?? null,
      type: payload.type,
      participants: payload.participants.map((el) => ({
        id: el.id,
        name: `${el.user.firstName} ${el.user.lastName}`,
        userId: +el.user.id,
      })),

      message: payload.lastMessage
        ? {
            id: payload.lastMessage.id,
            message: payload.lastMessage.message,
            createdAt: payload.lastMessage.createdAt,
            updatedAt: payload.lastMessage.updatedAt,
            deletedAt: payload.lastMessage.deletedAt,
            type: +payload.lastMessage.type,
            user: payload.lastMessage.user
              ? {
                  id: +payload.lastMessage.user.id,
                  firstName: payload.lastMessage.user.firstName,
                  lastName: payload.lastMessage.user.lastName,
                  role: +payload.lastMessage.user.role,
                  avatarUrl: payload.lastMessage.user.avatarUrl,
                }
              : null,
          }
        : null,
    };
  }
}
