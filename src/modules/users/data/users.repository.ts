import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user';
import { UserDao } from 'src/common/dao/user.dao';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { TagDao } from 'src/common/dao/tag.dao';
import { Tag } from 'src/common/entities/tag';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly usersRepository: Repository<UserDao>,
    @InjectRepository(TagDao)
    private readonly tagsRepsitory: Repository<Tag>,
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

  detailById(userId: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['tags'],
    });
  }

  create(payload: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(payload);
    return this.usersRepository.save(user);
  }

  async insertUserTagAndFetch(userId: number, tagId: number) {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    const tag = await this.tagsRepsitory.findOneBy({
      id: tagId,
    });

    user.tags = [tag];
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

  async deleteAllUserTags(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    user.tags = [];

    return this.usersRepository.save(user);
  }
}
