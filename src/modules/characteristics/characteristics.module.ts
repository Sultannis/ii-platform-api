import { Module } from '@nestjs/common';
import { CharacteristicsService } from './domain/characteristics.service';
import { CharacteristicsController } from './characteristics.controller';
import { CharacteristicsRepository } from './data/characteristics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicDao } from 'src/common/dao/characteristic.dao';

@Module({
  imports: [TypeOrmModule.forFeature([CharacteristicDao])],
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService, CharacteristicsRepository],
  exports: [CharacteristicsService],
})
export class CharacteristicsModule {}
