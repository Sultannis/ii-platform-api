import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
