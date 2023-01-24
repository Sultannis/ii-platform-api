import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDao } from './user.dao';

@Entity('user_contact_lists')
export class ContactListDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'phone_number', type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ name: 'linkedin_link', type: 'varchar', nullable: true })
  linkedinLink?: string;

  @Column({ name: 'github_link', type: 'varchar', nullable: true })
  githubLink: string;

  @Column({ name: 'telegram_nickname', type: 'varchar', nullable: true })
  telegramNickname: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: 'now()',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: 'now()',
  })
  updatedAt: string;

  @OneToOne(() => UserDao, (user) => user.contactList)
  @JoinColumn({ name: 'user_id' })
  user?: UserDao;
}
