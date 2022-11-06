import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminDao } from 'src/common/dao/admin.dao';
import { Admin } from 'src/common/entities/admin';
import { CreateAdminDto } from 'src/modules/admins/dto/create-admin.dto';
import { UpdateAdminDto } from 'src/modules/admins/dto/update-admin.dto';

@Injectable()
export class AdminsRepository {
  constructor(
    @InjectRepository(AdminDao)
    private readonly adminsRepository: Repository<AdminDao>,
  ) {}

  findOne(adminId: number): Promise<Admin> {
    return this.adminsRepository.findOne({
      where: { id: adminId },
    });
  }

  findByEmail(email: string): Promise<Admin> {
    return this.adminsRepository.findOne({ where: { email } });
  }

  create(payload: CreateAdminDto): Promise<Admin> {
    const createdAdmin = this.adminsRepository.create(payload);
    return this.adminsRepository.save(createdAdmin);
  }

  async updateById(
    adminId: number,
    payload: UpdateAdminDto,
  ): Promise<Admin | null> {
    await this.adminsRepository.update(adminId, payload);
    return this.adminsRepository.findOne({
      where: { id: adminId },
    });
  }

  async softDeleteById(adminId: number): Promise<Admin> {
    await this.adminsRepository.softDelete(adminId);
    return this.adminsRepository.findOne({
      where: { id: adminId },
      withDeleted: true,
    });
  }
}
