import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class PresenterFindAllIdeasDto {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  per_page: number;

  @IsNotEmpty()
  @IsDateString()
  start_timestamp: string;
}
