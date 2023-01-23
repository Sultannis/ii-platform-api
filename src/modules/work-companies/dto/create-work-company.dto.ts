export class CreateWorkCompanyDto {
  userId: number;
  companyName: string;
  description?: string;
  position: string;
  country: string;
  startDate: string;
  endDate: string;
}
