import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { generateContactList } from '../generators/contact-list.generator';
import { generateEducationalInstitution } from '../generators/educational-insitution.generator';
import { generateUser } from '../generators/user.generator';
import { generateWorkCompany } from '../generators/work-company.generator';

export const seedUsersWithRelations = async (dataSource: DataSource) => {
  const usersRepository = dataSource.getRepository('UserDao');
  const contactListsRepository = dataSource.getRepository('ContactListDao');
  const userCharacteristicsRepository = dataSource.getRepository(
    'UserCharacteristicDao',
  );
  const workCompaniesRepository = dataSource.getRepository('WorkCompanyDao');
  const educationalInsitutionsRepository = dataSource.getRepository(
    'EducationalInstitutionDao',
  );

  try {
    for (let i = 0; i < 40; i++) {
      const user = usersRepository.create(generateUser());
      await usersRepository.save(user);

      await contactListsRepository.insert(generateContactList(user.id));

      for (let i = 0; i < 5; i++) {
        const characteristicId = faker.datatype.number({ min: 1, max: 40 });

        await userCharacteristicsRepository.insert({
          userId: user.id,
          characteristicId,
        });
      }

      for (let i = 0; i < 3; i++) {
        await workCompaniesRepository.insert(generateWorkCompany(user.id));
      }

      for (let i = 0; i < 3; i++) {
        await educationalInsitutionsRepository.insert(
          generateEducationalInstitution(user.id),
        );
      }
    }
  } catch (error: unknown) {
    console.log(`Error: Failed to seed Users`);
    console.log(error);
    process.exit();
  }

  console.log(`Users seeded`);
};
