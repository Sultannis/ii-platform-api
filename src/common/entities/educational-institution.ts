import { User } from './user';

export class EducationalInstitution {
  id: number;
  userId: number;
  institutionName: string;
  description?: string;
  levelOfEducation: string;
  country: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  user?: User;
}
