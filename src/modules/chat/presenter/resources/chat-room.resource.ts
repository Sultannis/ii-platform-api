import { ChatRoom } from 'src/common/entities/chat-room';

export class ChatRoomResource {
  covert(payload: ChatRoom) {
    return {
      id: payload.id,
      name: payload.name,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      deletedAt: payload.deletedAt,
      notReadedMessagesAmount: payload.notReadedMessagesAmount ?? null,
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
                  chatColor: payload.lastMessage.user.chatColor,
                  avatarUrl: payload.lastMessage.user.avatarUrl,
                }
              : null,
          }
        : null,
    };
  }
}
