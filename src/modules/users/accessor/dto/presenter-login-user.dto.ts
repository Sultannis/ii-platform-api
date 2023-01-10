import { IsNotEmpty, IsString } from 'class-validator';

export class PresenterLoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
