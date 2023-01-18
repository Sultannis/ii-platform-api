import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CharacteristicsService } from '../characteristics.service';

@Controller('characteristics')
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characteristicsService.remove(+id);
  }
}
