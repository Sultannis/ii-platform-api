import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user';
import { UserDao } from 'src/common/dao/user.dao';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { mapUserDaoToEntity } from 'src/common/mappers/user.mappers';
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

    return userDao ? mapUserDaoToEntity(userDao) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDao = await this.usersRepository.findOne({
      where: { email },
    });

    return userDao ? mapUserDaoToEntity(userDao) : null;
  }

  async create(payload: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(payload);
    const userDao = await this.usersRepository.save(user);

    return mapUserDaoToEntity(userDao);
  }
}
