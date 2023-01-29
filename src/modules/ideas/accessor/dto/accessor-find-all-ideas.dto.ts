import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class AccessorFindAllIdeasDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  per_page: number;

  @IsNotEmpty()
  @IsDateString()
  start_timestamp: string;
}
