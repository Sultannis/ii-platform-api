import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IdeaDao } from './idea.dao';

@Entity('tags')
export class TagDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @ManyToMany(() => IdeaDao)
  @JoinTable({
    name: 'user_tags',
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idea_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => IdeaDao)
  ideas?: IdeaDao[];
}
