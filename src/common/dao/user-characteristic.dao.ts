import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_characteristics')
export class UserCharacteristicDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'characteristic_id', type: 'bigint' })
  characteristicId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;
}
