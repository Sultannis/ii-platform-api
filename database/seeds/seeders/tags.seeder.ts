import { DataSource } from 'typeorm';

const generateTagName = () => {
  const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  let result = '';

  for (let i = 0; i < 5; i++) {
    result = result + chars[Math.floor(Math.random() * 26)];
  }

  return result;
};

export const seedTags = async (dataSource: DataSource) => {
  const repository = dataSource.getRepository('TagDao');

  try {
    for (let i = 0; i < 10000000; i++) {
      await repository.insert({ name: generateTagName() });
    }
  } catch (error: unknown) {
    console.log(`Error: Failed to seed Tags`);
    console.log(error);
    process.exit(1);
  }

  console.log(`Tags seeded`);
};
