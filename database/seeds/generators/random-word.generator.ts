import { faker } from '@faker-js/faker/locale/en';

export const generateRandomWord = (): string => {
  return faker.lorem.words(1);
};
