import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AccessorFindUserContactListDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  user_id: number;
}
