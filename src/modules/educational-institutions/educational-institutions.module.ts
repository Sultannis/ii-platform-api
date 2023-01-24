import { Module } from '@nestjs/common';
import { EducationalInstitutionsService } from './educational-institutions.service';
import { EducationalInstitutionsController } from './accessor/educational-institutions.controller';
import { EducationalInstitutionsRepository } from './educational-institutions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalInstitutionDao } from 'src/common/dao/educational-institution.dao';
import { EducationalInstitutionResource } from './accessor/resources/educational-institution.resource';

@Module({
  imports: [TypeOrmModule.forFeature([EducationalInstitutionDao])],
  controllers: [EducationalInstitutionsController],
  providers: [
    EducationalInstitutionsService,
    EducationalInstitutionsRepository,
    EducationalInstitutionResource,
  ],
  exports: [EducationalInstitutionResource],
})
export class EducationalInstitutionsModule {}
