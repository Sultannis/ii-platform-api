import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacteristicDao } from 'src/common/dao/characteristic.dao';
import { Repository } from 'typeorm';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';
import { Characteristic } from '../entities/characteristic.entity';

@Injectable()
export class CharacteristicsRepository {
  constructor(
    @InjectRepository(CharacteristicDao)
    private readonly characteristicsRepository: Repository<CharacteristicDao>,
  ) {}

  create(payload: CreateCharacteristicDto): Promise<Characteristic> {
    const characteristic = this.characteristicsRepository.create(payload);
    return this.characteristicsRepository.save(characteristic);
  }

  findOneByName(name: string): Promise<Characteristic> {
    return this.characteristicsRepository.findOneBy({
      name,
    });
  }
}
