import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class AccessorFindIdeasDto {
  @IsOptional()
  @IsNumber()
  per_page: number;

  @IsOptional()
  @IsNumber()
  page: number;

  @IsDateString()
  @IsString()
  start_timestamp: string;
}