import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AccessorFindAllUserWorkCompaniesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Type(() => Number)
  user_id: number;
}
