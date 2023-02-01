import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserCharacteristic } from 'src/common/entities/characteristic';
import { CharacteristicsRepository } from './characteristics.repository';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';

@Injectable()
export class CharacteristicsService {
  constructor(
    private readonly characteristicsRepository: CharacteristicsRepository,
  ) {}

  async createWithoutPresenceCheck(
    payload: CreateCharacteristicDto,
  ): Promise<UserCharacteristic> {
    return this.characteristicsRepository.insertAndFetch(payload);
  }

  async create(payload: CreateCharacteristicDto): Promise<UserCharacteristic> {
    const characteristic = await this.characteristicsRepository.findOneByName(
      payload.name,
    );
    if (characteristic) {
      throw new ConflictException(
        'Characteristic with provided name already exist',
      );
    }

    return this.characteristicsRepository.insertAndFetch(payload);
  }

  findOneByNameWithoutAbsenceCheck(name: string): Promise<UserCharacteristic> {
    return this.characteristicsRepository.findOneByName(name);
  }

  async findOneByName(name: string): Promise<UserCharacteristic> {
    const characteristic = await this.characteristicsRepository.findOneByName(
      name,
    );

    if (!characteristic) {
      throw new NotFoundException('Characteristic does not exist');
    }

    return characteristic;
  }

  async remove(characteristicId: number) {
    const characteristic = await this.characteristicsRepository.findOneById(
      characteristicId,
    );
    if (!characteristic) {
      throw new NotFoundException('Characteristic does not exist');
    }

    await this.characteristicsRepository.deleteById(characteristicId);
  }
}
