import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AccessorFetchRecomendedPeopleDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  per_page: number;

  @IsNotEmpty()
  @IsString()
  start_timestamp: string;
}
