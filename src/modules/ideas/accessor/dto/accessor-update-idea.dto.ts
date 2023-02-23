import { IsOptional, IsString } from 'class-validator';

export class AccessorUpdateIdeaDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsString()
  description: string;
}
