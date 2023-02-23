import { IsDateString, IsOptional, IsString } from 'class-validator';

export class AccessorUpdateEducationalInstitutionDto {
  @IsOptional()
  @IsString()
  institution_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  level_of_education?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
