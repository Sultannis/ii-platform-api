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

@Entity('chat_room_participants')
export class ChatRoomParticipantDao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'room_id', type: 'uuid' })
  roomId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserDao, (user) => user.participants)
  user: UserDao;

  @JoinColumn({ name: 'room_id' })
  @ManyToOne(() => ChatRoomDao, (room) => room.participants)
  room: ChatRoomDao;
}
