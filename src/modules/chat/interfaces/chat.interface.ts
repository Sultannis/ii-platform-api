import { Socket } from 'socket.io';
import { ChatMessage } from 'src/common/entities/chat-message';
import { User } from 'src/common/entities/user';

export interface UserData {
  handshake: {
    user: User;
  };
}

export interface ReadMessagesPayload {
  roomId: string;
  messageId: string;
}

export interface MessagePayload {
  roomId: string;
  message: string;
}

export interface JoinRoomPayload {
  roomId: string;
  page?: number;
  perPage?: number;
}

export type AuthClient = Socket & UserData;
