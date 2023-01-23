import { Injectable } from '@nestjs/common';
import { EducationalInstitutionDao } from 'src/common/dao/educational-institution.dao';
import { EducationalInstitution } from 'src/common/entities/educational-institution';
import { Repository } from 'typeorm';
import { CreateEducationalInstitutionDto } from './dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from './dto/update-educational-institution.dto';

@Injectable()
export class EducationalInstitutionsRepository {
  constructor(
    private readonly educationalInstitutionsRepository: Repository<EducationalInstitutionDao>,
  ) {}

  insertAndFetch(
    payload: CreateEducationalInstitutionDto,
  ): Promise<EducationalInstitution> {
    const institution = this.educationalInstitutionsRepository.create(payload);
    return this.educationalInstitutionsRepository.save(institution);
  }

  findAllByUserId(userId: number): Promise<EducationalInstitution[]> {
    return this.educationalInstitutionsRepository.find({
      where: {
        userId,
      },
    });
  }

  async updateAndFetchOneById(
    workCompanyId: number,
    payload: UpdateEducationalInstitutionDto,
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
