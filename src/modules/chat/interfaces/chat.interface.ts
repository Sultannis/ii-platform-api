import { Socket } from 'socket.io';
import { User } from 'src/common/entities/user';

export interface UserData {
  handshake: {
    user: User;
  };
}

export interface Message {
  roomId: string;
  message: string;
}

export type AuthClient = Socket & UserData;
