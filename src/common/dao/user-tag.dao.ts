import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagDao } from './tag.dao';
import { UserDao } from './user.dao';

@Entity('user_tags')
export class UserTagDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'tag_id', type: 'bigint' })
  tagId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @ManyToOne(() => UserDao, (user) => user.tags)
  user: UserDao;

  @ManyToOne(() => TagDao, (tag) => tag.users)
  tag: TagDao;
}
