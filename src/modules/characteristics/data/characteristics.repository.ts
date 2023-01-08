import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacteristicDao } from 'src/common/dao/characteristic.dao';
import { Characteristic } from 'src/common/entities/characteristic';
import { Repository } from 'typeorm';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';

@Injectable()
export class CharacteristicsRepository {
  constructor(
    @InjectRepository(CharacteristicDao)
    private readonly characteristicsRepository: Repository<CharacteristicDao>,
  ) {}

  insertAndFetch(payload: CreateCharacteristicDto): Promise<Characteristic> {
    const characteristic = this.characteristicsRepository.create(payload);
    return this.characteristicsRepository.save(characteristic);
  }

  findOneByName(name: string): Promise<Characteristic> {
    return this.characteristicsRepository.findOneBy({
      name,
    });
  }
}
