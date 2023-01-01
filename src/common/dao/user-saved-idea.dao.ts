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
import { IdeaDao } from './idea.dao';
import { UserDao } from './user.dao';

@Entity('user_saved_ideas')
export class UserSavedIdeaDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'idea_id', type: 'bigint' })
  ideaId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserDao, (user) => user.savedIdeas)
  user?: UserDao;

  @JoinColumn({ name: 'idea_id' })
  @ManyToOne(() => IdeaDao, (idea) => idea.usersWhoSaved)
  idea?: IdeaDao;
}
