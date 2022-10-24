import { RegisterUserDto } from './../dto/register-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { User } from 'src/common/entities/user';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly usersRepository: Repository<UserDao>,
  ) {}

  async findById(userId: number): Promise<User | null> {
    const userDao = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return userDao ? this.mapUserDaoToEntity(userDao) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDao = await this.usersRepository.findOne({
      where: { email },
    });

    return userDao ? this.mapUserDaoToEntity(userDao) : null;
  }

  async create(payload: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(payload);
    const userDao = await this.usersRepository.save(user);

    return this.mapUserDaoToEntity(userDao);
  }

  private mapUserDaoToEntity = (user: UserDao): User => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    password: user.password,
    confirmedAt: user.confirmedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  });
}
