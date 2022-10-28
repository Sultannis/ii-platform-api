import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IdeaDao } from './idea.dao';

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

  @Column({ name: 'occupation', type: 'varchar', length: 255 })
  occupation: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'role', type: 'smallint', default: 0 })
  role: number;

  @Column({ name: 'confirmed_at', type: 'timestamp', nullable: true })
  confirmedAt?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: string;

  @OneToMany(() => IdeaDao, (idea) => idea.user)
  ideas: IdeaDao[];
}
