import { Idea } from './idea';
import { Tag } from './tag';

export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  birthDate?: string;
  residenceCountry?: string;
  residenceCity?: string;
  occupation?: string;
  workCompany?: string;
  educationalInstitution?: string;
  bio?: string;
  telegramNickname?: string;
  linkedinLink?: string;
  description?: string;
  role: number;
  password: string;
  chatColor: string;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string | null;
  deletedAt?: string | null;
  ideas?: Idea[];
  tags?: Tag[];
}
