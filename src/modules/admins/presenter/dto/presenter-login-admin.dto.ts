import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PresenterLoginAdminDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  password: string;
}
