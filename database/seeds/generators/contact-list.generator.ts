import { faker } from '@faker-js/faker';

export const generateContactList = (userId: number) => {
  return {
    userId,
    phoneNumber: faker.phone.number('+7##########'),
    linkedinLink: faker.internet.url(),
    githubLink: faker.internet.url(),
    telegram_nickname: faker.internet.userName(),
  };
};
