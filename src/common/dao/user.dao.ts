import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacteristicDao } from './characteristic.dao';
import { ContactListDao } from './contact-list.dao';
import { EducationalInstitutionDao } from './educational-institution.dao';
import { IdeaDao } from './idea.dao';
import { WorkCompanyDao } from './work-company.dao';

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

  @Column({ name: 'nickname', type: 'varchar', length: 255, nullable: true })
  nickname?: string;

  @Column({
    name: 'birth_date',
    type: 'timestamp',
    nullable: true,
  })
  birthDate?: string;

  @Column({ name: 'occupation', type: 'varchar', length: 255, nullable: true })
  occupation?: string;

  @Column({
    name: 'residence_country',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  residenceCountry?: string;

  @Column({
    name: 'residence_city',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  residenceCity?: string;

  @Column({
    name: 'bio',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  bio?: string;

  @Column({
    name: 'avatar_file_key',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  avatarFileKey?: string;

  @Column({ name: 'role', type: 'smallint', default: 0 })
  role: number;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'confirmed_at', type: 'timestamptz', nullable: true })
  confirmedAt?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @OneToMany(() => WorkCompanyDao, (workCompany) => workCompany.user)
  workCompanies: WorkCompanyDao[];

  @OneToMany(
    () => EducationalInstitutionDao,
    (educationalInstitution) => educationalInstitution.user,
  )
  educationalInstitutions: EducationalInstitutionDao[];

  @OneToMany(() => IdeaDao, (idea) => idea.author)
  ideas: IdeaDao[];

  @ManyToMany(() => CharacteristicDao)
  @JoinTable({
    name: 'user_characteristics',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'characteristic_id',
      referencedColumnName: 'id',
    },
  })
  characteristics: CharacteristicDao[];

  @OneToOne(() => ContactListDao, (contactList) => contactList.user)
  contactList: ContactListDao;
}
