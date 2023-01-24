import { UserCharacteristic } from './characteristic';
import { EducationalInstitution } from './educational-institution';
import { WorkCompany } from './work-company';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nickname?: string;
  birthDate?: string;
  occupation?: string;
  residenceCountry?: string;
  residenceCity?: string;
  bio?: string;
  avatarUrl?: string;
  role: number;
  password: string;
  confirmedAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  characteristics: UserCharacteristic[];
  workCompanies: WorkCompany[];
  educationalInstitutions: EducationalInstitution[];
}
