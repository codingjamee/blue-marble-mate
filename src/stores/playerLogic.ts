import { ColorOption, colorOptions } from '../constants/colors';
import { getRandomElement } from '../utils/utils';
import { PlayerNamesType, PlayerState } from './playerStore';
import { v4 as uuid } from 'uuid';

const getAvailableColors = (usedColors: PlayerNamesType['color'][]): ColorOption['value'][] => {
  return colorOptions
    .filter((color) => !usedColors.includes(color.value))
    .map((color) => color.value);
};

const getPlayerInitialize = ({ number, state }: { number: number; state: PlayerState }) => {
  const currentPlayers = [...state.playerNames];
  if (currentPlayers.length > number) {
    return currentPlayers.slice(0, number);
  }

  const playersToAdd = number - state.playerNames.length;
  const available = getAvailableColors(currentPlayers.map((p) => p.color));
  const selectedColors = Array(playersToAdd)
    .fill(null)
    .reduce<ColorOption['value'][]>((acc) => {
      const remainingColors = available.filter((color) => !acc.includes(color));
      if (remainingColors.length === 0) return acc;
      acc.push(getRandomElement(remainingColors));
      return acc;
    }, []);

  const newToAddedInit = selectedColors.map((color) => ({
    id: uuid(),
    name: '',
    color,
  }));

  return [...currentPlayers, ...newToAddedInit];
};

export { getAvailableColors, getPlayerInitialize };
