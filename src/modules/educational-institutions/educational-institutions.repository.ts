import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationalInstitutionDao } from 'src/common/dao/educational-institution.dao';
import { EducationalInstitution } from 'src/common/entities/educational-institution';
import { DeleteResult, Repository } from 'typeorm';
import { CreateEducationalInstitutionDto } from './dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from './dto/update-educational-institution.dto';

@Injectable()
export class EducationalInstitutionsRepository {
  constructor(
    @InjectRepository(EducationalInstitutionDao)
    private readonly educationalInstitutionsRepository: Repository<EducationalInstitutionDao>,
  ) {}

  insertAndFetch(
    payload: CreateEducationalInstitutionDto,
  ): Promise<EducationalInstitution> {
    const institution = this.educationalInstitutionsRepository.create(payload);
    return this.educationalInstitutionsRepository.save(institution);
  }

  findOneById(institutionId: number): Promise<EducationalInstitution> {
    return this.educationalInstitutionsRepository.findOneBy({
      id: institutionId,
    });
  }

  findAllByUserId(userId: number): Promise<EducationalInstitution[]> {
    return this.educationalInstitutionsRepository.find({
      where: {
        userId,
      },
    });
  }

  async updateAndFetchOneById(
    educationalInstitutionId: number,
    payload: UpdateEducationalInstitutionDto,
  ): Promise<EducationalInstitution> {
    await this.educationalInstitutionsRepository.update(
      educationalInstitutionId,
      payload,
    );

    return this.educationalInstitutionsRepository.findOneBy({
      id: educationalInstitutionId,
    });
  }

  deleteById(workCompanyId: number): Promise<DeleteResult> {
    return this.educationalInstitutionsRepository.delete(workCompanyId);
  }
}
