import { ChatMessage } from 'src/common/entities/chat-message';
import { ChatRoom } from 'src/common/entities/chat-room';
import { ChatMessageDao } from 'src/common/dao/chat-message.dao';
import { ChatRoomDao } from 'src/common/dao/chat-room.dao';
import { mapUserDaoToEntity } from './user.mappers';

export const mapChatMessageDaoToEntity = (
  payload: ChatMessageDao,
): ChatMessage => ({
  id: payload.id,
  userId: +payload.userId,
  roomId: payload.roomId,
  message: payload.message,
  type: payload.type,
  replyTo: payload.replyTo,
  readedAt: payload.readedAt,
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
  deletedAt: payload.deletedAt,
  user: payload.user ? mapUserDaoToEntity(payload.user) : null,
  room: payload.room ? mapChatRoomDaoToEntity(payload.room) : null,
});

export const mapChatRoomDaoToEntity = (payload: ChatRoomDao): ChatRoom => ({
  id: payload.id,
  roomAdminId: +payload.roomAdminId,
  name: payload.name,
  usersAccess: payload.usersAccess,
  backgroundColor: payload.backgroundColor,
  backgroundImage: payload.backgroundImage,
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
  deletedAt: payload.deletedAt,
  messages: payload.messages,
});
