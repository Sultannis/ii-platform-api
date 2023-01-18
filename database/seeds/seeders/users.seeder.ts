import { DataSource } from 'typeorm';
import { generateUser } from '../generators/user.generator';
import { USERS } from '../values/users';

export const seedUsers = async (dataSource: DataSource) => {
  const repository = dataSource.getRepository('UserDao');

  try {
    for (let i = 0; i < 40; i++) {
      await repository.insert(generateUser());
    }
  } catch (error: unknown) {
    console.log(`Error: Failed to seed Users`);
    console.log(error);
    process.exit(1);
  }

  console.log(`Users seeded`);
};
