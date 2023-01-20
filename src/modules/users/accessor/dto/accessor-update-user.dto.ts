import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class AccessorUpdateUserDto {
  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  nickname: string;

  @IsOptional()
  @IsDateString()
  birth_date: string;

  @IsOptional()
  @IsString()
  residence_country: string;

  @IsOptional()
  @IsString()
  residence_city: string;

  @IsOptional()
  @IsString()
  occupation: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  characteristics: string[];
}
