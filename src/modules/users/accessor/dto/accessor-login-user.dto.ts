import { IsNotEmpty, IsString } from 'class-validator';

export class AccessorLoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
