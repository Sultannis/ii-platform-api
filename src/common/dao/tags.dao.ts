import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class TagsDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz'})
  createdAt: string;
}