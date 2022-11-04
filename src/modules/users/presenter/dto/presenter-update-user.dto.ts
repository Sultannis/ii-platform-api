import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PresenterRegisterUserDto {
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
  birthDate: string;

  @IsOptional()
  @IsString()
  residenceCountry: string;

  @IsOptional()
  @IsString()
  residenceCity: string;

  @IsOptional()
  @IsString()
  occupation: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  workCompany: string;

  @IsOptional()
  @IsString()
  educationalInstitution: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  telegramNickaname: string;

  @IsOptional()
  @IsString()
  linkedinLink: string;

  @IsOptional()
  @IsString()
  description: string;
}
