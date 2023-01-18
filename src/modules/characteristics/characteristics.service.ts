import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Characteristic } from 'src/common/entities/characteristic';
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
  ): Promise<Characteristic> {
    return this.characteristicsRepository.insertAndFetch(payload);
  }

  async create(payload: CreateCharacteristicDto): Promise<Characteristic> {
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

  findAllByUserId(userId: number) {
    return this.characteristicsRepository.findAllByUserId(userId)
  }

  findOneByNameWithoutAbsenceCheck(name: string): Promise<Characteristic> {
    return this.characteristicsRepository.findOneByName(name);
  }

  async findOneByName(name: string): Promise<Characteristic> {
    const characteristic = await this.characteristicsRepository.findOneByName(
      name,
    );

    if (!characteristic) {
      throw new NotFoundException('Characteristic does not exist');
    }

    return characteristic;
  }

  update(id: number, updateCharacteristicDto: UpdateCharacteristicDto) {
    return `This action updates a #${id} characteristic`;
  }

  remove(id: number) {
    return `This action removes a #${id} characteristic`;
  }
}
