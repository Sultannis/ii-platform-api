import { IsDateString, IsOptional, IsString } from 'class-validator';

export class AccessorUpdateWorkCompanyDto {
  @IsOptional()
  @IsString()
  company_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date: string;
}
