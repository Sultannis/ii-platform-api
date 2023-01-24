import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagDao } from './tag.dao';
import { UserDao } from './user.dao';

@Entity('ideas')
export class IdeaDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'author_id', type: 'bigint' })
  authorId: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'subtitle', type: 'varchar' })
  subtitle: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'likes', type: 'int' })
  likes: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @ManyToOne(() => UserDao, (user) => user.ideas)
  @JoinColumn({ name: 'user_id' })
  user?: UserDao;

  @ManyToMany(() => TagDao)
  @JoinTable({
    name: 'idea_tags',
    joinColumn: {
      name: 'idea_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagDao[];
}
