import { Module } from '@nestjs/common';
import { WorkCompaniesService } from './work-companies.service';
import { WorkCompaniesController } from './accessor/work-companies.controller';
import { WorkCompaniesRepository } from './work-companies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkCompanyDao } from 'src/common/dao/work-company.dao';
import { WorkCompanyResource } from './accessor/resources/work-company.resource';

@Module({
  imports: [TypeOrmModule.forFeature([WorkCompanyDao])],
  controllers: [WorkCompaniesController],
  providers: [
    WorkCompaniesService,
    WorkCompaniesRepository,
    WorkCompanyResource,
  ],
  exports: [
    WorkCompanyResource
  ]
})
export class WorkCompaniesModule {}
