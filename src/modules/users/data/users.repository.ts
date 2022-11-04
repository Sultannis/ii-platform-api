import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user';
import { UserDao } from 'src/common/dao/user.dao';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserTagDao } from 'src/common/dao/user-tag.dao';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly usersRepository: Repository<UserDao>,
    @InjectRepository(UserTagDao)
    private readonly userTagsRepository: Repository<UserTagDao>,
  ) {}

  findById(userId: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  create(payload: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(payload);
    return this.usersRepository.save(user);
  }

  async updateByIdAndFetch(
    userId: number,
    payload: UpdateUserDto,
  ): Promise<User> {
    await this.usersRepository.update(userId, payload);

    return this.usersRepository.findOneBy({
      id: userId,
    });
  }

  async deleteAllUserTags(userId: number): Promise<void> {
    await this.userTagsRepository.delete({
      userId,
    });
  }
}
