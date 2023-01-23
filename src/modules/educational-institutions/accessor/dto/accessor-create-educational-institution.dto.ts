import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccessorCreateEducationalInstitutionDto {
  @IsNotEmpty()
  @IsString()
  institution_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  level_of_education: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
