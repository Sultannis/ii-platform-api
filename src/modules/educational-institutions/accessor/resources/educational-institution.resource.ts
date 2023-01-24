import { Injectable } from '@nestjs/common';
import { EducationalInstitution } from 'src/common/entities/educational-institution';

@Injectable()
export class EducationalInstitutionResource {
  convert(educationalInstitution: EducationalInstitution) {
    return {
      id: +educationalInstitution.id,
      user_id: +educationalInstitution.userId,
      institution_name: educationalInstitution.institutionName,
      description: educationalInstitution.description,
      level_of_education: educationalInstitution.levelOfEducation,
      country: educationalInstitution.country,
      start_date: educationalInstitution.startDate,
      end_date: educationalInstitution.endDate,
      created_at: educationalInstitution.createdAt,
    };
  }
}
