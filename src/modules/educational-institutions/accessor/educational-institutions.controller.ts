import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/modules/auth/entities/request-user';
import { EducationalInstitutionsService } from '../educational-institutions.service';
import { EducationalInstitutionResource } from './resources/educational-institution.resource';
import { Request as RequestType } from 'express';
import { CreateEducationalInstitutionDto } from '../dto/create-educational-institution.dto';
import { AccessorCreateEducationalInstitutionDto } from './dto/accessor-create-educational-institution.dto';

@ApiTags('Educational-institutions')
@Controller('educational-institutions')
export class EducationalInstitutionsController {
  constructor(
    private readonly educationalInstitutionsService: EducationalInstitutionsService,
    private readonly educationalInstitutionResource: EducationalInstitutionResource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: RequestType,
    @Body()
    accessorCreateEducationalInstitutionDto: AccessorCreateEducationalInstitutionDto,
  ) {
    const user = req.user as RequestUser;

    const payload: CreateEducationalInstitutionDto = {
      userId: user.id,
      institutionName: accessorCreateEducationalInstitutionDto.institution_name,
      description: accessorCreateEducationalInstitutionDto.description,
      levelOfEducation:
        accessorCreateEducationalInstitutionDto.level_of_education,
      country: accessorCreateEducationalInstitutionDto.country,
      startDate: accessorCreateEducationalInstitutionDto.start_date,
      endDate: accessorCreateEducationalInstitutionDto.end_date,
    };

    const workCompany = await this.educationalInstitutionsService.create(payload);

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
