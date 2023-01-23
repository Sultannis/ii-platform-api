import { Injectable } from "@nestjs/common";
import { EducationalInstitutionDao } from "src/common/dao/educational-institution.dao";
import { Repository } from "typeorm";
import { CreateEducationalInstitutionDto } from "./dto/create-educational-institution.dto";

@Injectable()
export class EducationalInstitutionsRepository {
  constructor(
    private readonly educationalInstitutionsRepository: Repository<EducationalInstitutionDao>
  ) {}
  
  insertAndFetch(payload: CreateEducationalInstitutionDto) {
    const institution = this.educationalInstitutionsRepository.create(payload);
    return this.educationalInstitutionsRepository.save(institution);
  }
}