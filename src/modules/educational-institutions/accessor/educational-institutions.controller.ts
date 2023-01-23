import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEducationalInstitutionDto } from '../dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from '../dto/update-educational-institution.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AccessorCreateWorkCompanyDto } from 'src/modules/work-companies/accessor/dto/accessor-create-work-company.dto';
import { CreateWorkCompanyDto } from 'src/modules/work-companies/dto/create-work-company.dto';
import { RequestUser } from 'src/modules/auth/entities/request-user';
import { EducationalInstitutionsService } from '../educational-institutions.service';

@ApiTags('Educational-institutions')
@Controller('educational-institutions')
export class EducationalInstitutionsController {
  constructor(
    private readonly workCompaniesService: EducationalInstitutionsService,
    private readonly workCompanyResource: EducationalInstitutionResource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() accessorCreateWorkCompanyDto: AccessorCreateWorkCompanyDto,
  ) {
    const user = req.user as RequestUser;

    const payload: CreateWorkCompanyDto = {
      userId: user.id,
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
