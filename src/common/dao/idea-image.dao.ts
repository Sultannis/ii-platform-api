import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IdeaDao } from './idea.dao';
import { UserDao } from './user.dao';

@Entity('idea-images')
export class IdeaImageDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'idea_id', type: 'bigint' })
  ideaId: number;

  @Column({ name: 'title', type: 'varchar' })
  url: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @JoinColumn({ name: 'idea_id' })
  @ManyToOne(() => IdeaDao, (idea) => idea.images)
  idea: UserDao;
}
