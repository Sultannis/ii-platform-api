import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { EducationalInstitution } from 'src/common/entities/educational-institution';
import { CreateEducationalInstitutionDto } from './dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from './dto/update-educational-institution.dto';
import { EducationalInstitutionsRepository } from './educational-institutions.repository';

@Injectable()
export class EducationalInstitutionsService {
  constructor(
    private readonly educationalInstitutionsRepository: EducationalInstitutionsRepository,
  ) {}

  async create(payload: CreateEducationalInstitutionDto) {
    return this.educationalInstitutionsRepository.insertAndFetch(payload);
  }

  findAll(userId: number): Promise<EducationalInstitution[]> {
    return this.educationalInstitutionsRepository.findAllByUserId(userId);
  }

  async update(
    institutionId: number,
    payload: UpdateEducationalInstitutionDto,
  ) {
    const institution =
      await this.educationalInstitutionsRepository.findOneById(institutionId);
    if (!institution) {
      throw new NotFoundException(
        'User educational institution does not exist',
      );
    }

    return this.educationalInstitutionsRepository.updateAndFetchOneById(
      institutionId,
      payload,
    );
  }

  async delete(institutionId: number): Promise<void> {
    const institution =
      await this.educationalInstitutionsRepository.findOneById(institutionId);
    if (!institution) {
      throw new NotFoundException(
        'User educational institution does not exist',
      );
    }

    await this.educationalInstitutionsRepository.deleteById(institutionId);
  }
}
