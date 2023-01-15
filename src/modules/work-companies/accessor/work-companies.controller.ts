import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkCompaniesService } from '../work-companies.service';
import { CreateWorkCompanyDto } from '../dto/create-work-company.dto';
import { UpdateWorkCompanyDto } from '../dto/update-work-company.dto';
import { AccessorCreateWorkCompanyDto } from './dto/accessor-create-work-company.dto';

@Controller('work-companies')
export class WorkCompaniesController {
  constructor(private readonly workCompaniesService: WorkCompaniesService) {}

  @Post()
  create(@Body() accessorCreateWorkCompanyDto: AccessorCreateWorkCompanyDto) {
    const payload: CreateWorkCompanyDto = {
      companyName: accessorCreateWorkCompanyDto.company_name,
      description: accessorCreateWorkCompanyDto.description,
      position: accessorCreateWorkCompanyDto.position,
      country: accessorCreateWorkCompanyDto.country,
      startDate: accessorCreateWorkCompanyDto.start_date,
      endDate: accessorCreateWorkCompanyDto.end_date,
    };

    return this.workCompaniesService.create(payload);
  }

  @Get()
  findAll() {
    return this.workCompaniesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workCompaniesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkCompanyDto: UpdateWorkCompanyDto,
  ) {
    return this.workCompaniesService.update(+id, updateWorkCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workCompaniesService.remove(+id);
  }
}
