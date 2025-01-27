import { NameRandom, nameRandom } from '../data/nameRandom';
import { getRandomElement } from './utils';

interface NameComponents {
  onomatopoeia: string;
  adjective: string;
  animal: string;
}

const getNameComponents = (data: NameRandom): NameComponents => {
  return {
    onomatopoeia: getRandomElement(data.onomatopoeia),
    adjective: getRandomElement(data.adjective),
    animal: getRandomElement(data.animal),
  };
};

const combineNameComponents = ({ onomatopoeia, adjective, animal }: NameComponents): string => {
  return `${onomatopoeia} ${adjective} ${animal}`;
};

const generateRandomPlayerName = (): string => {
  const nameData = structuredClone(nameRandom);
  const components = getNameComponents(nameData);
  console.log(combineNameComponents(components));

  return combineNameComponents(components);
};

export { generateRandomPlayerName };
