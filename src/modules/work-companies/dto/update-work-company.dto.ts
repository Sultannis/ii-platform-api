import { PartialType } from '@nestjs/swagger';
import { CreateWorkCompanyDto } from './create-work-company.dto';

export class UpdateWorkCompanyDto extends PartialType(CreateWorkCompanyDto) {}
