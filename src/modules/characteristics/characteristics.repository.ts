import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacteristicDao } from 'src/common/dao/characteristic.dao';
import { UserCharacteristic } from 'src/common/entities/characteristic';
import { Repository } from 'typeorm';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';

@Injectable()
export class CharacteristicsRepository {
  constructor(
    @InjectRepository(CharacteristicDao)
    private readonly characteristicsRepository: Repository<CharacteristicDao>,
  ) {}

  insertAndFetch(
    payload: CreateCharacteristicDto,
  ): Promise<UserCharacteristic> {
    const characteristic = this.characteristicsRepository.create(payload);
    return this.characteristicsRepository.save(characteristic);
  }

  findOneByName(name: string): Promise<UserCharacteristic> {
    return this.characteristicsRepository.findOneBy({
      name,
    });
  }

  findAllByUserId(userId: number): Promise<UserCharacteristic[]> {
    return this.characteristicsRepository
      .createQueryBuilder()
      .relation('characteristics')
      .of(userId)
      .loadMany();
  }
}
