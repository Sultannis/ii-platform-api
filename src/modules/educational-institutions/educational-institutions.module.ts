import { Module } from '@nestjs/common';
import { EducationalInstitutionsService } from './educational-institutions.service';
import { EducationalInstitutionsController } from './accessor/educational-institutions.controller';

@Module({
  controllers: [EducationalInstitutionsController],
  providers: [EducationalInstitutionsService]
})
export class EducationalInstitutionsModule {}
