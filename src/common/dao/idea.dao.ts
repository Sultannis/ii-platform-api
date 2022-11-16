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
import { UserDao } from './user.dao';

@Entity('ideas')
export class IdeaDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'subtitle', type: 'text' })
  subtitle: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'score', type: 'int' })
  score: number;

  @Column({ name: 'main_image_url', type: 'varchar' })
  mainImageUrl?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserDao, (user) => user.ideas)
  user?: UserDao;
}
