import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WorkCompaniesService } from '../work-companies.service';
import { CreateWorkCompanyDto } from '../dto/create-work-company.dto';
import { UpdateWorkCompanyDto } from '../dto/update-work-company.dto';
import { AccessorCreateWorkCompanyDto } from './dto/accessor-create-work-company.dto';
import { WorkCompanyResource } from './resources/work-company.resource';

@Controller('work-companies')
export class WorkCompaniesController {
  constructor(
    private readonly workCompaniesService: WorkCompaniesService,
    private readonly workCompanyResource: WorkCompanyResource,
  ) {}

  @Post()
  async create(
    @Body() accessorCreateWorkCompanyDto: AccessorCreateWorkCompanyDto,
  ) {
    const payload: CreateWorkCompanyDto = {
      companyName: accessorCreateWorkCompanyDto.company_name,
      description: accessorCreateWorkCompanyDto.description,
      position: accessorCreateWorkCompanyDto.position,
      country: accessorCreateWorkCompanyDto.country,
      startDate: accessorCreateWorkCompanyDto.start_date,
      endDate: accessorCreateWorkCompanyDto.end_date,
    };

    const workCompany = await this.workCompaniesService.create(payload);

    return {
      work_company: this.workCompanyResource.convert(workCompany),
    };
  }

  @Get()
  async findAll(@Query('user_id') userId: string) {
    const workCompanies = await this.workCompaniesService.findAll(+userId);

    return {
      work_companies: workCompanies.map(this.workCompanyResource.convert),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const workCompany = await this.workCompaniesService.findOne(+id);

    return {
      work_company: this.workCompanyResource.convert(workCompany),
    };
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
