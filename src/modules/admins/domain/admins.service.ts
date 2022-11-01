import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminsRepository } from 'src/modules/admins/data/admins.repository';
import { AuthService } from 'src/modules/auth/domain/auth.service';
import { Admin } from 'src/common/entities/admin';
import { AdminRoles } from 'src/common/constant/admin-roles';
import { UserTypes } from 'src/common/constant/user-types';
import { CreateAdminDto } from 'src/modules/admins/dto/create-admin.dto';
import { LoginAdminDto } from 'src/modules/admins/dto/login-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { RequestUser } from 'src/modules/auth/entities/request-user';
import { ResetAdminPasswordDto } from '../dto/reset-admin-password.dto';

@Injectable()
export class AdminsService {
  constructor(
    private readonly adminsRepository: AdminsRepository,
    private readonly authService: AuthService,
  ) {}

  async findOne(adminId: number): Promise<Admin> {
    const admin = await this.adminsRepository.findOne(adminId);
    if (!admin) {
      throw new NotFoundException('Admin does not exist');
    }

    return admin;
  }

  async findByEmail(email: string): Promise<Admin> {
    const admin = await this.adminsRepository.findByEmail(email);
    if (!admin) {
      throw new NotFoundException('Admin does not exist');
    }

    return admin;
  }

  async create(payload: CreateAdminDto): Promise<Admin> {
    const admin = await this.adminsRepository.findByEmail(payload.email);
    if (admin) {
      throw new ConflictException('Admin with provided email already exists');
    }

    if (!AdminRoles[payload.role]) {
      throw new BadRequestException('Admin role does not exist');
    }

    const hashedPassword = await this.authService.hashPassword(
      payload.password,
    );

    return this.adminsRepository.create({
      ...payload,
      password: hashedPassword,
    });
  }

  async login(payload: LoginAdminDto): Promise<[admin: Admin, token: string]> {
    const admin = await this.adminsRepository.findByEmail(payload.email);
    if (!admin) {
      throw new NotFoundException('Admin does not exist');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      admin.password,
      payload.password,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const token = this.authService.generateAdminAuthToken({
      id: admin.id,
      role: admin.role,
      type: UserTypes.ADMIN,
    });

    return [admin, token];
  }

  async update(
    adminId: number,
    payload: UpdateAdminDto,
    requestUser: RequestUser,
  ): Promise<Admin> {
    const admin = await this.adminsRepository.findOne(adminId);
    if (!admin) {
      throw new NotFoundException('Admin does not exist');
    }

    if (!AdminRoles[payload.role]) {
      throw new BadRequestException('Admin role does not exist');
    }

    if (+requestUser.role !== AdminRoles.OWNER) {
      delete payload.role;
    }

    return this.adminsRepository.updateById(adminId, payload);
  }

  async resetPassword(
    adminId: number,
    payload: ResetAdminPasswordDto,
  ): Promise<Admin> {
    const admin = await this.adminsRepository.findOne(adminId);
    if (!admin) {
      throw new UnauthorizedException('Admin does not exist');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      admin.password,
      payload.oldPassword,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException('Old password does not match');
    }

    const hashedPassword = await this.authService.hashPassword(
      payload.newPassword,
    );

    return this.adminsRepository.updateById(adminId, {
      password: hashedPassword,
    });
  }

  async delete(adminId: number): Promise<Admin> {
    const admin = await this.adminsRepository.findOne(adminId);
    if (!admin) {
      throw new NotFoundException('Admin does not exist');
    }

    return this.adminsRepository.softDeleteById(adminId);
  }
}
