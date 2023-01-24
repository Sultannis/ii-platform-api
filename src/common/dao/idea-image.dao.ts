import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('idea_images')
export class IdeaImageDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'idea_id', type: 'bigint' })
  ideaId: number;

  @Column({ name: 'path', type: 'varchar' })
  path: string;

  @Column({ name: 'is_main', default: false, type: 'boolean' })
  isMain: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: string;
}
