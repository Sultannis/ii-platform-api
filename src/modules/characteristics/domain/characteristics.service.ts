import { Injectable, NotFoundException } from '@nestjs/common';
import { CharacteristicsRepository } from '../data/characteristics.repository';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from '../dto/update-characteristic.dto';
import { Characteristic } from '../entities/characteristic.entity';

@Injectable()
export class CharacteristicsService {
  constructor(
    private readonly characteristicsRepository: CharacteristicsRepository,
  ) {}

  create(createCharacteristicDto: CreateCharacteristicDto) {
    return 'This action adds a new characteristic';
  }

  findAll() {
    return `This action returns all characteristics`;
  }

  fetchOneByNameWithoutAbsenceCheck(name: string): Promise<Characteristic> {
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
