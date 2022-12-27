import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PresenterFindAllIdeasDto {
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

  @IsOptional()
  @IsString()
  sort_by: string;
}
