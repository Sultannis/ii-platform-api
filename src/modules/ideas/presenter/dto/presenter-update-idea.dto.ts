import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PresenterUpdateIdeaDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
