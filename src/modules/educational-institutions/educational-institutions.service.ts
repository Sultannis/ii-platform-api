import { Injectable } from '@nestjs/common';
import { CreateEducationalInstitutionDto } from './dto/create-educational-institution.dto';
import { UpdateEducationalInstitutionDto } from './dto/update-educational-institution.dto';

@Injectable()
export class EducationalInstitutionsService {
  create(createEducationalInstitutionDto: CreateEducationalInstitutionDto) {
    return 'This action adds a new educationalInstitution';
  }

  findAll() {
    return `This action returns all educationalInstitutions`;
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
