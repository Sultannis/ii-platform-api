import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user';
import { UserDao } from 'src/common/dao/user.dao';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { TagDao } from 'src/common/dao/tag.dao';
import { Tag } from 'src/common/entities/tag';
import { UserTagDao } from 'src/common/dao/user-tag.dao';
import { InsertUpdateUserDto } from '../dto/insert-update-user.dto';
import { FindAllPeopleDto } from '../dto/find-all-people.dto';

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


  findAll({
    page,
    perPage,
    startTimestamp,
  }: FindAllPeopleDto): Promise<[users: User[], total: number]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .take(perPage)
      .skip((page - 1) * perPage)
      .where('user.created_at <= :startTimestamp', {
        startTimestamp,
      })
      .orderBy('user.created_at', 'DESC')
      .getManyAndCount();
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

  async updateByIdAndFetch(
    userId: number,
    payload: InsertUpdateUserDto,
  ): Promise<User> {
    await this.usersRepository.update(userId, payload);

    return this.usersRepository.findOneBy({
      id: userId,
    });
  }

  insertUserTagAndFetch(userId: number, tagId: number) {
    const userTag = this.userTagsRepository.create({ userId, tagId });

    return this.userTagsRepository.save(userTag);
  }

  async deleteAllUserTags(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    user.tags = [];

    return this.usersRepository.save(user);
  }
}
