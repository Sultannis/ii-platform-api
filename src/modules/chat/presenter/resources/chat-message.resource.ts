import { ChatMessage } from 'src/common/entities/chat-message';

export class ChatMessageResource {
  convert(payload: ChatMessage) {
    return {
      id: payload.id,
      message: payload.message,
      readedAt: payload.readedAt,
      replyTo: payload.replyTo,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      deletedAt: payload.deletedAt,
      user: {
        id: +payload.user.id,
        firstName: payload.user.firstName,
        lastName: payload.user.lastName,
        chatColor: payload.user.chatColor,
        avatarUrl: payload.user.avatarUrl,
      },
    };
  }
}
