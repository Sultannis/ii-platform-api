import { Injectable } from '@nestjs/common';
import { CreateEducationalInstitutionDto } from './dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from './dto/update-educational-institution.dto';
import { EducationalInstitutionsRepository } from './educational-institutions.repository';

@Injectable()
export class EducationalInstitutionsService {
  constructor(
    private readonly educationalInstitutionsRepository: EducationalInstitutionsRepository
  ) {}

  async create(payload: CreateEducationalInstitutionDto) {
    return this.educationalInstitutionsRepository.insertAndFetch(payload)
  }

  findAll(userId: number) {
    return this.educationalInstitutionsRepository.
  }

  findOne(id: number) {
    return `This action returns a #${id} educationalInstitution`;
  }

  update(id: number, updateEducationalInstitutionDto: UpdateEducationalInstitutionDto) {
    return `This action updates a #${id} educationalInstitution`;
  }

  remove(id: number) {
    return `This action removes a #${id} educationalInstitution`;
  }
}
