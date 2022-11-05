import { ChatMessage } from 'src/common/entities/chat-message';

export class ChatMessageResource {
  convert(payload: ChatMessage) {
    return {
      id: payload.id,
      message: payload.message,
      readed_at: payload.readedAt,
      reply_to: payload.replyTo,
      created_at: payload.createdAt,
      updated_at: payload.updatedAt,
      deleted_at: payload.deletedAt,
      user: {
        id: payload.user.id,
        first_name: payload.user.firstName,
        last_name: payload.user.lastName,
        avatar_url: payload.user.avatarUrl,
      },
    };
  }
}
