import { ChatRoom } from 'src/common/entities/chat-room';

export class ChatRoomResource {
  covert(payload: ChatRoom) {
    return {
      id: payload.id,
      name: payload.name,
      created_at: payload.createdAt,
      updated_at: payload.updatedAt,
      deleted_at: payload.deletedAt,
      not_readed_messages_amount: payload.notReadedMessagesAmount ?? null,
      message: payload.lastMessage
        ? {
            id: payload.lastMessage.id,
            message: payload.lastMessage.message,
            created_at: payload.lastMessage.createdAt,
            updated_t: payload.lastMessage.updatedAt,
            deleted_at: payload.lastMessage.deletedAt,
            type: +payload.lastMessage.type,
            user: payload.lastMessage.user
              ? {
                  id: +payload.lastMessage.user.id,
                  first_name: payload.lastMessage.user.firstName,
                  last_name: payload.lastMessage.user.lastName,
                  role: +payload.lastMessage.user.role,
                  chat_color: payload.lastMessage.user.chatColor,
                  avatar_url: payload.lastMessage.user.avatarUrl,
                }
              : null,
          }
        : null,
    };
  }
}
