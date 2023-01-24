import { DataSource } from 'typeorm';
import { generateUser } from '../generators/user.generator';

export const seedUsers = async (dataSource: DataSource) => {
  const usersRepository = dataSource.getRepository('UserDao');
  const contactListsRepository = dataSource.getRepository('ContactListDao');

  try {
    for (let i = 0; i < 40; i++) {
      const user = usersRepository.create(generateUser());
      await usersRepository.save(user);
      await contactListsRepository.insert({ userId: user.id });
    }
  } catch (error: unknown) {
    console.log(`Error: Failed to seed Users`);
    console.log(error);
    process.exit(1);
  }

  console.log(`Users seeded`);
};
