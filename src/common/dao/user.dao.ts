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
import { UserTagDao } from './user-tag.dao';

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

  @Column({ name: 'nickname', type: 'varchar', length: 255, nullable: true })
  nickname?: string;

  @Column({
    name: 'birth_date',
    type: 'timestamp',
    nullable: true,
  })
  birthDate?: string;

  @Column({
    name: 'residence_country',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  residenceCountry?: string;

  @Column({
    name: 'residence_city',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  residenceCity?: string;

  @Column({ name: 'occupation', type: 'varchar', length: 255, nullable: true })
  occupation?: string;

  @Column({
    name: 'work_company',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  workCompany?: string;

  @Column({
    name: 'educational_institution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  educationalInstitution?: string;

  @Column({
    name: 'bio',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  bio?: string;

  @Column({
    name: 'telegram_nickname',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  telegramNickname?: string;

  @Column({
    name: 'linkedin_link',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  linkedinLink?: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'role', type: 'smallint', default: 0 })
  role: number;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl?: string;

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
  ideas?: IdeaDao[];

  @OneToMany(() => ChatRoomParticipantDao, (participant) => participant.user)
  participants: ChatRoomParticipantDao[];

  @OneToMany(() => UserTagDao, (userTag) => userTag.user)
  tags?: UserTagDao[];
}
