import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AccessorFindAllUserWorkCompaniesDto {
  @IsNotEmpty()
  @IsNumberString()
  @Type(() => Number)
  user_id: number;
}
