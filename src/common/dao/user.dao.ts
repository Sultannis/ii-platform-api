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
import { IdeaDao } from './idea.dao';

@Entity('users')
export class UserDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'occupation', type: 'varchar', length: 255 })
  occupation: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'role', type: 'smallint', default: 0 })
  role: number;

  @Column({
    name: 'chat_color',
    type: 'varchar',
    length: 10,
    default: '#FAA774',
  })
  chatColor: string;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl: string;

  @Column({ name: 'confirmed_at', type: 'timestamptz', nullable: true })
  confirmedAt?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @OneToMany(() => ChatMessageDao, (message) => message.user)
  messages?: ChatMessageDao[];

  @OneToMany(() => IdeaDao, (idea) => idea.user)
  ideas: IdeaDao[];

  @OneToMany(() => ChatRoomParticipantDao, (participant) => participant.user)
  participants: ChatRoomParticipantDao[];
}
