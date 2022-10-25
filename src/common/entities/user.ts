export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  password: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string | null;
  deletedAt?: string | null;
}
