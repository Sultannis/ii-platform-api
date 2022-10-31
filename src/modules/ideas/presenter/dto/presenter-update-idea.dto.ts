import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PresenterUpdateIdeaDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumberString()
  required_financial_support?: number;
}
