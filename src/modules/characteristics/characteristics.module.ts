import { Module } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './accessor/characteristics.controller';
import { CharacteristicsRepository } from './characteristics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicDao } from 'src/common/dao/characteristic.dao';
import { CharacteristicResource } from './accessor/resources/characteristic.resource';

@Module({
  imports: [TypeOrmModule.forFeature([CharacteristicDao])],
  controllers: [CharacteristicsController],
  providers: [
    CharacteristicsService,
    CharacteristicsRepository,
    CharacteristicResource,
  ],
  exports: [CharacteristicsService, CharacteristicResource],
})
export class CharacteristicsModule {}
