import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDao } from './user.dao';

@Entity('characteristics')
export class CharacteristicDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @ManyToMany(() => CharacteristicDao)
  @JoinTable({
    name: 'user_characteristics',
    joinColumn: {
      name: 'characteristic_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => UserDao)
  users: UserDao[];
}
