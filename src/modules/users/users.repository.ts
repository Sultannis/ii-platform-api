import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { User } from 'src/common/entities/user';
import { FindAllPeopleDto } from './dto/find-all-people.dto';
import { FindRecomendedPeopleDto } from './dto/find-recomended-people.dto';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCharacteristicDao } from 'src/common/dao/user-characteristic.dao';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly usersRepository: Repository<UserDao>,
    @InjectRepository(UserCharacteristicDao)
    private readonly usersCharacteristicRepository: Repository<UserCharacteristicDao>,
  ) {}

  findOneById(userId: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  findOneWithRelationsById(userId: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['characteristics', 'educationalInstitutions'],
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  findAllWithStartTimestamp({
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

  findRecomendedPeopleWithStartTimestamp({
    userId,
    page,
    perPage,
    startTimestamp,
  }: FindRecomendedPeopleDto): Promise<[users: User[], total: number]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .skip((page - 1) * perPage)
      .take(perPage)
      .where('user.id != :userId', { userId })
      .andWhere('user.createdAt <= :startTimestamp', { startTimestamp })
      .getManyAndCount();
  }

  create(payload: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(payload);
    return this.usersRepository.save(user);
  }

  async addAndSaveNewCharacteristicToUserIfDoesntExist(
    userId: number,
    characteristicId: number,
  ): Promise<void> {
    const userCharacteristic =
      await this.usersCharacteristicRepository.findOneBy({
        userId,
        characteristicId,
      });
    if (!userCharacteristic) {
      await this.usersCharacteristicRepository.insert({
        userId,
        characteristicId,
      });
    }
  }

  deleteUserCharacteristicByCharacteristicId(
    userId: number,
    characteristicId: number,
  ) {
    return this.usersRepository
      .createQueryBuilder()
      .relation('characteristics')
      .of(userId)
      .remove(characteristicId);
  }

  async updateAndFetchOneById(
    userId: number,
    payload: Omit<UpdateUserDto, 'characteristics'>,
  ): Promise<User> {
    await this.usersRepository.update(userId, payload);

    return this.usersRepository.findOneBy({
      id: userId,
    });
  }
}
