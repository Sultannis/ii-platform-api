import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDao } from './user.dao';

@Entity('user_educational_institutions')
export class EducationalInstitutionDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'institution_name', type: 'varchar' })
  institutionName: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'level_of_education', type: 'varchar' })
  levelOfEducation: string;

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

  @ManyToOne(() => UserDao, (user) => user.educationalInstitutions)
  @JoinColumn({ name: 'user_id' })
  user?: UserDao;
}
