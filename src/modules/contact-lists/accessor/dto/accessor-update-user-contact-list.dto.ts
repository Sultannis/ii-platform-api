import { IsOptional, IsString } from 'class-validator';

export class AccessorUpdateUserContactListDto {
  @IsOptional()
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsString()
  linkedin_link: string;

  @IsOptional()
  @IsString()
  github_link: string;

  @IsOptional()
  @IsString()
  telegram_nickname: string;
}
