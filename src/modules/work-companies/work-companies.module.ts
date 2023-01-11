import { Module } from '@nestjs/common';
import { WorkCompaniesService } from './work-companies.service';
import { WorkCompaniesController } from './accessor/work-companies.controller';
import { WorkCompaniesRepository } from './work-companies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkCompanyDao } from 'src/common/dao/work-company.dao';

@Module({
  imports: [TypeOrmModule.forFeature([WorkCompanyDao])],
  controllers: [WorkCompaniesController],
  providers: [WorkCompaniesService, WorkCompaniesRepository],
})
export class WorkCompaniesModule {}
