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
import { AccessorUpdateWorkCompanyDto } from './dto/accessor-update-work-company.dto';

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

  @Get(':work_company_id')
  async findOne(@Param('work_company_id') workCompanyId: string) {
    const workCompany = await this.workCompaniesService.findOne(+workCompanyId);

    return {
      work_company: this.workCompanyResource.convert(workCompany),
    };
  }

  @Patch(':work_company_id')
  async update(
    @Param('work_company_id') workCompanyId: string,
    @Body() accessorUpdateWorkCompanyDto: AccessorUpdateWorkCompanyDto,
  ) {
    const payload: UpdateWorkCompanyDto = {
      companyName: accessorUpdateWorkCompanyDto.company_name,
      description: accessorUpdateWorkCompanyDto.description,
      position: accessorUpdateWorkCompanyDto.position,
      country: accessorUpdateWorkCompanyDto.country,
      startDate: accessorUpdateWorkCompanyDto.start_date,
      endDate: accessorUpdateWorkCompanyDto.end_date,
    };

    const workCompany = await this.workCompaniesService.update(
      +workCompanyId,
      payload,
    );

    return {
      work_company: this.workCompanyResource.convert(workCompany),
    };
  }

  @Delete(':work_company_id')
  async delete(@Param('work_company_id') workCompanyId: string) {
    return await this.workCompaniesService.delete(+workCompanyId);
  }
}
