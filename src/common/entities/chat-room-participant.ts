import { User } from './user';
import { ChatRoom } from './chat-room';

export class ChatRoomParticipant {
  id: string;
  userId: number;
  roomId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user: User;
  room: ChatRoom;
}
