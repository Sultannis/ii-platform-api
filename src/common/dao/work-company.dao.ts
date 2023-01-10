import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserDao } from './user.dao';

@Entity('user_work_companies')
export class WorkCompanyDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'company_Name', type: 'varchar' })
  companyName: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'position', type: 'varchar' })
  position: string;

  @Column({ name: 'country', type: 'varchar' })
  country: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: string;

  @Column({ name: 'end_date', type: 'timestamptz', nullable: true })
  endDate: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: 'now()',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: 'now()',
  })
  updatedAt: string;

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: string;

  @ManyToOne(() => UserDao, (user) => user.workCompanies)
  @JoinColumn({ name: 'user_id' })
  user?: UserDao;
}
