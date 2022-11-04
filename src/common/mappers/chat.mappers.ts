import { ChatMessage } from 'src/common/entities/chat-message';
import { ChatRoom } from 'src/common/entities/chat-room';
import { ChatRoomParticipant } from 'src/common/entities/chat-room-participant';
import { ChatMessageDao } from 'src/common/dao/chat-message.dao';
import { ChatRoomDao } from 'src/common/dao/chat-room.dao';
import { mapUserDaoToEntity } from './user.mappers';
import { ChatRoomParticipantDao } from '../dao/chat-room-participant.dao';

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
  backgroundColor: payload.backgroundColor,
  backgroundImage: payload.backgroundImage,
  type: payload.type,
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
  deletedAt: payload.deletedAt,
  messages: payload.messages
    ? payload.messages.map(mapChatMessageDaoToEntity)
    : null,
  participants: payload.participants
    ? payload.participants.map(mapChatRoomParticipantDaoToEntity)
    : null,
});

export const mapChatRoomParticipantDaoToEntity = (
  payload: ChatRoomParticipantDao,
): ChatRoomParticipant => ({
  id: payload.id,
  userId: +payload.userId,
  roomId: payload.roomId,
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
  deletedAt: payload.deletedAt,
  user: payload.user ? mapUserDaoToEntity(payload.user) : null,
  room: payload.room ? mapChatRoomDaoToEntity(payload.room) : null,
});
