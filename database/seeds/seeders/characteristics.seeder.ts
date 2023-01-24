import { DataSource } from 'typeorm';
import { generateRandomWord } from '../generators/random-word.generator';

export const seedCharacteristics = async (dataSource: DataSource) => {
  const characteristicsRepository =
    dataSource.getRepository('CharacteristicDao');

  try {
    for (let i = 0; i < 40; i++) {
      await characteristicsRepository.insert({
        name: generateRandomWord()
      });
    }
  } catch (error: unknown) {
    console.log(`Error: Failed to seed Characteristics`);
    console.log(error);
    process.exit(1);
  }

  console.log(`Characteristics seeded`);
};
