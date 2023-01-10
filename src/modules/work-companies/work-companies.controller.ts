import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkCompaniesService } from './work-companies.service';
import { CreateWorkCompanyDto } from './dto/create-work-company.dto';
import { UpdateWorkCompanyDto } from './dto/update-work-company.dto';

@Controller('work-companies')
export class WorkCompaniesController {
  constructor(private readonly workCompaniesService: WorkCompaniesService) {}

  @Post()
  create(@Body() createWorkCompanyDto: CreateWorkCompanyDto) {
    return this.workCompaniesService.create(createWorkCompanyDto);
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
  update(@Param('id') id: string, @Body() updateWorkCompanyDto: UpdateWorkCompanyDto) {
    return this.workCompaniesService.update(+id, updateWorkCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workCompaniesService.remove(+id);
  }
}
