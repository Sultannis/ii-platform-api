import { IsNotEmpty, IsString } from 'class-validator';

export class PresenterCreateIdeaDto {
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
