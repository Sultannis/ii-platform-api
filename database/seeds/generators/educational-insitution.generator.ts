import { faker } from "@faker-js/faker"

export const generateEducationalInstitution = (userId: number) => {
  const startDate = faker.date.recent();
  const endDate = faker.date.soon(90, startDate);
  
  return {
    userId,
    institutionName: faker.company.name(),
    description: faker.lorem.words(15),
    levelOfEducation: faker.helpers.arrayElement(['High school', 'Bachelor', 'Masters', 'PhD']),
    country: faker.address.country(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }
} 