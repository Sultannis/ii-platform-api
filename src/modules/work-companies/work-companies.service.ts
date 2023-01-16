import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkCompany } from 'src/common/entities/work-company';
import { CreateWorkCompanyDto } from './dto/create-work-company.dto';
import { UpdateWorkCompanyDto } from './dto/update-work-company.dto';
import { WorkCompaniesRepository } from './work-companies.repository';

@Injectable()
export class WorkCompaniesService {
  constructor(
    private readonly workCompaniesRepository: WorkCompaniesRepository,
  ) {}

  create(createWorkCompanyDto: CreateWorkCompanyDto) {
    return this.workCompaniesRepository.create(createWorkCompanyDto);
  }

  findAll(userId: number): Promise<WorkCompany[]> {
    return this.workCompaniesRepository.findAllByUserId(userId);
  }

  async findOne(workCompanyId: number): Promise<WorkCompany> {
    const workCompany = await this.workCompaniesRepository.findOneById(
      workCompanyId,
    );
    if (!workCompany) {
      throw new NotFoundException('Work company does not exist');
    }

    return workCompany;
  }

  update(id: number, updateWorkCompanyDto: UpdateWorkCompanyDto) {
    return `This action updates a #${id} workCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} workCompany`;
  }
}
