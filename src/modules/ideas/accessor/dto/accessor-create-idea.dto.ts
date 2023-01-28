import { IsNotEmpty, IsString } from 'class-validator';

export class AccessorCreateIdeaDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
