import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class PresenterCreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumberString()
  requiredFinancialSupport: number;
}