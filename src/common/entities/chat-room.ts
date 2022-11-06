import { ChatMessage } from './chat-message';
import { ChatRoomParticipant } from './chat-room-participant';

export class ChatRoom {
  id: string;
  roomAdminId: number;
  name: string;
  backgroundColor?: string | null;
  backgroundImage?: string | null;
  type: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  messages?: ChatMessage[];
  lastMessage?: ChatMessage;
  notReadedMessagesAmount?: number | null;
  participants?: ChatRoomParticipant[];
  participantsAmount?: number;
}
