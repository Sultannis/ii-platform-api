export class UpdateUserDto {
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: string;
  residenceCountry: string;
  residenceCity: string;
  occupation: string;
  bio: string;
  characteristics?: string[];
}