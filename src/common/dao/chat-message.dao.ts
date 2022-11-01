import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatRoomDao } from './chat-room.dao';
import { UserDao } from './user.dao';

@Entity('chat_messages')
export class ChatMessageDao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'room_id', type: 'uuid' })
  roomId: string;

  @Column({ name: 'message', type: 'text' })
  message: string;

  @Column({ name: 'type', type: 'smallint', default: 0 })
  type: number;

  @Column({ name: 'reply_to', type: 'uuid', nullable: true })
  replyTo?: string | null;

  @Column({ name: 'readed_at', type: 'timestamp', nullable: true })
  readedAt?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserDao, (user) => user.messages)
  user: UserDao;

  @JoinColumn({ name: 'room_id' })
  @ManyToOne(() => ChatRoomDao, (room) => room.messages)
  room: ChatRoomDao;
}
