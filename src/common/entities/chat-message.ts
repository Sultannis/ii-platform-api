import { User } from './user';
import { ChatRoom } from './chat-room';

export class ChatMessage {
  id: string;
  userId: number;
  roomId: string;
  message: string;
  type: number;
  readedAt?: string | null;
  replyTo?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user?: User;
  room?: ChatRoom;
}