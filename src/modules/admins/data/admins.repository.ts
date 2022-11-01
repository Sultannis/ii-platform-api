import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminDao } from 'src/common/dao/admin.dao';
import { Admin } from 'src/common/entities/admin';
import { CreateAdminDto } from 'src/modules/admins/dto/create-admin.dto';
import { UpdateAdminDto } from 'src/modules/admins/dto/update-admin.dto';
import { mapAdminDaoToEntity } from 'src/common/mappers/admin.mappers';

@Injectable()
export class AdminsRepository {
  constructor(
    @InjectRepository(AdminDao)
    private readonly adminsRepository: Repository<AdminDao>,
  ) {}

  async findOne(adminId: number): Promise<Admin | null> {
    const adminDao = await this.adminsRepository.findOne({
      where: { id: adminId },
    });
    return adminDao ? mapAdminDaoToEntity(adminDao) : null;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const adminDao = await this.adminsRepository.findOne({ where: { email } });
    return adminDao ? mapAdminDaoToEntity(adminDao) : null;
  }

  async create(payload: CreateAdminDto): Promise<Admin | null> {
    const createdAdmin = this.adminsRepository.create(payload);
    const adminDao = await this.adminsRepository.save(createdAdmin);

    return adminDao ? mapAdminDaoToEntity(adminDao) : null;
  }

  async updateById(
    adminId: number,
    payload: UpdateAdminDto,
  ): Promise<Admin | null> {
    await this.adminsRepository.update(adminId, payload);
    const updatedAdminDao = await this.adminsRepository.findOne({
      where: { id: adminId },
    });

    return updatedAdminDao ? mapAdminDaoToEntity(updatedAdminDao) : null;
  }

  async softDeleteById(adminId: number): Promise<Admin | null> {
    await this.adminsRepository.softDelete(adminId);
    const deletedAdminDao = await this.adminsRepository.findOne({
      where: { id: adminId },
      withDeleted: true,
    });

    return deletedAdminDao ? mapAdminDaoToEntity(deletedAdminDao) : null;
  }
}
