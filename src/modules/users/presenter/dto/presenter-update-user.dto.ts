import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class PresenterUpdateUserDto {
  @IsOptional()
  @IsArray()
  tags: Array<{ name: string; id?: number }>;

  @IsOptional()
  @IsString()
  email: string;

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
  password: string;

  @IsOptional()
  @IsString()
  work_company: string;

  @IsOptional()
  @IsString()
  educational_institution: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  telegram_nickaname: string;

  @IsOptional()
  @IsString()
  linkedin_link: string;

  @IsOptional()
  @IsString()
  description: string;
}
