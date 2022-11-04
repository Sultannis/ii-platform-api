export class UpdateUserDto {
  tags?: Array<{ name: string; id?: number }>;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: string;
  residenceCountry: string;
  residenceCity: string;
  occupation: string;
  password: string;
  workCompany: string;
  educationalInstitution: string;
  bio: string;
  telegramNickaname: string;
  linkedinLink: string;
  description: string;
}
