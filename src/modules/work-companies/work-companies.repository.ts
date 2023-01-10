import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { WorkCompanyDao } from 'src/common/dao/work-company.dao';
import { WorkCompany } from 'src/common/entities/work-company';
import { UpdateWorkCompanyDto } from './dto/update-work-company.dto';
import { CreateWorkCompanyDto } from './dto/create-work-company.dto';

@Injectable()
export class WorkCompaniesRepository {
  constructor(
    @InjectRepository(WorkCompanyDao)
    private readonly workCompaniesRepository: Repository<WorkCompanyDao>,
  ) {}

  create(payload: CreateWorkCompanyDto): Promise<WorkCompany> {
    const workCompany = this.workCompaniesRepository.create(payload);
    return this.workCompaniesRepository.save(workCompany);
  }

  findOneById(workCompanyId: number): Promise<WorkCompany> {
    return this.workCompaniesRepository.findOne({
      where: { id: workCompanyId },
    });
  }

  findAllByUserId(userId: number): Promise<WorkCompany[]> {
    return this.workCompaniesRepository.find({
      where: {
        userId,
      },
    });
  }

  async updateAndFetchOneById(
    workCompanyId: number,
    payload: UpdateWorkCompanyDto,
  ): Promise<WorkCompany> {
    await this.workCompaniesRepository.update(workCompanyId, payload);

    return this.workCompaniesRepository.findOneBy({
      id: workCompanyId,
    });
  }

  deleteById(workCompanyId: number): Promise<DeleteResult> {
    return this.workCompaniesRepository.delete(workCompanyId);
  }
}
