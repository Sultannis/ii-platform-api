import { Module } from '@nestjs/common';
import { WorkCompaniesService } from './work-companies.service';
import { WorkCompaniesController } from './work-companies.controller';

@Module({
  controllers: [WorkCompaniesController],
  providers: [WorkCompaniesService]
})
export class WorkCompaniesModule {}
