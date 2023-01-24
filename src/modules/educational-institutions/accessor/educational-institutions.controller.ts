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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/modules/auth/entities/request-user';
import { EducationalInstitutionsService } from '../educational-institutions.service';
import { EducationalInstitutionResource } from './resources/educational-institution.resource';
import { Request as RequestType } from 'express';
import { CreateEducationalInstitutionDto } from '../dto/create-educational-institution.dto';
import { AccessorCreateEducationalInstitutionDto } from './dto/accessor-create-educational-institution.dto';
import { AccessorUpdateEducationalInstitutionDto } from './dto/accessor-update-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from '../dto/update-educational-institution.dto';

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

    const educationalInstitution =
      await this.educationalInstitutionsService.create(payload);

    return {
      educational_institution: this.educationalInstitutionResource.convert(
        educationalInstitution,
      ),
    };
  }

  @Get()
  async findAll(@Query('user_id') userId: string) {
    const educationalInstitutions =
      await this.educationalInstitutionsService.findAll(+userId);

    return {
      educational_institutions: educationalInstitutions.map(
        this.educationalInstitutionResource.convert,
      ),
    };
  }

  @Patch(':educational_institution_id')
  async update(
    @Param('educational_institution_id') educationalInstitutionId: string,
    @Body()
    accessorUpdateWorkCompanyDto: AccessorUpdateEducationalInstitutionDto,
  ) {
    const payload: UpdateEducationalInstitutionDto = {
      institutionName: accessorUpdateWorkCompanyDto.institution_name,
      description: accessorUpdateWorkCompanyDto.description,
      levelOfEducation: accessorUpdateWorkCompanyDto.level_of_education,
      country: accessorUpdateWorkCompanyDto.country,
      startDate: accessorUpdateWorkCompanyDto.start_date,
      endDate: accessorUpdateWorkCompanyDto.end_date,
    };

    const educationalInstitution =
      await this.educationalInstitutionsService.update(
        +educationalInstitutionId,
        payload,
      );

    return {
      educational_institution: this.educationalInstitutionResource.convert(
        educationalInstitution,
      ),
    };
  }

  @Delete(':educational_institution_id')
  async delete(
    @Param('educational_institution_id') educationalInstitutionId: string,
  ) {
    return await this.educationalInstitutionsService.delete(
      +educationalInstitutionId,
    );
  }
}
