import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkCompanyDao } from 'src/common/dao/workCompany.dao';
import { WorkCompany } from 'src/common/entities/workCompany';
import { FindAllCompaniesDto } from './dto/find-all-companies.dto';
import { FindRecomendedCompaniesDto } from './dto/find-recomended-companies.dto';
import { RegisterWorkCompanyDto } from 'src/modules/workCompanies/dto/register-workCompany.dto';
import { UpdateWorkCompanyDto } from './dto/update-workCompany.dto';
import { WorkCompanyCharacteristicDao } from 'src/common/dao/workCompany-characteristic.dao';

@Injectable()
export class WorkCompaniesRepository {
  constructor(
    @InjectRepository(WorkCompanyDao)
    private readonly workCompaniesRepository: Repository<WorkCompanyDao>,
  ) {}

  create(payload: RegisterWorkCompanyDto): Promise<WorkCompany> {
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
    payload: Omit<UpdateWorkCompanyDto, 'characteristics'>,
  ): Promise<WorkCompany> {
    await this.workCompaniesRepository.update(workCompanyId, payload);

    return this.workCompaniesRepository.findOneBy({
      id: workCompanyId,
    });
  }

  deleteById(workCompanyId: number): Promise<WorkCompany> {
    return this.workCompaniesRepository.delete(workCompanyId);
  }
}
