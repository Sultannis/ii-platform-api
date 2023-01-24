import { faker } from '@faker-js/faker';

export const generateWorkCompany = (userId: number) => {
  const startDate = faker.date.recent();
  const endDate = faker.date.soon(90, startDate);

  return {
    userId,
    companyName: faker.company.name(),
    description: faker.lorem.words(60),
    position: faker.name.jobType(),
    country: faker.address.country(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};
