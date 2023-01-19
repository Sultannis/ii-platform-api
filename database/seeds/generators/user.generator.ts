import { faker } from '@faker-js/faker/locale/en';
import { getRandomOccupation } from '../helpers/get-random-occupation';
import { GeneratedUser } from '../types/generated-user';

export const generateUser = (): GeneratedUser => {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);
  const nickname = faker.helpers.unique(faker.internet.userName, [
    firstName,
    lastName,
  ]);

  return {
    firstName,
    lastName,
    email,
    nickname,
    birthDate: faker.date.birthdate().toISOString(),
    occupation: getRandomOccupation(),
    residenceCountry: faker.address.country(),
    residenceCity: faker.address.cityName(),
    bio: faker.lorem.words(10),
    avatarUrl: faker.image.avatar(),
    role: 2,
    password: '$2a$10$Tx1B/3h2.26ppwkPARIywuOqHLAP8ZsHYie4vtHJAGInYFSZ.9UTG',
  };
};
