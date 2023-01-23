export class CreateEducationalInstitutionDto {
  userId: number;
  institutionName: string;
  description?: string;
  levelOfEducation: string;
  country: string;
  startDate: string;
  endDate: string;
}
