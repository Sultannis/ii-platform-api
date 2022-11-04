import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatMessageDao } from './chat-message.dao';
import { ChatRoomParticipantDao } from './chat-room-participant.dao';

@Entity('chat_rooms')
export class ChatRoomDao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'room_admin_id', type: 'bigint' })
  roomAdminId: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'type', type: 'smallint', default: 1 })
  type: number;

  @Column({ name: 'background_color', type: 'varchar', nullable: true })
  backgroundColor?: string;

  @Column({ name: 'background_image', type: 'varchar', nullable: true })
  backgroundImage?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: string;

  @OneToMany(() => ChatMessageDao, (message) => message.room)
  messages: ChatMessageDao[];

  @OneToMany(() => ChatRoomParticipantDao, (participant) => participant.room)
  participants: ChatRoomParticipantDao[];
}
