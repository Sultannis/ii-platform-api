import { User } from './user';

export class WorkCompany {
  id: number;
  userId: number;
  companyName: string;
  description: string;
  position: string;
  country: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}
