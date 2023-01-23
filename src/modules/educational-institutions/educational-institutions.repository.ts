import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class EducationalInstitutionsRepository {
  constructor(
    private readonly educationalInstitutionsRepository: Repository<EducationalInstitutionda
  ) {

  }
}