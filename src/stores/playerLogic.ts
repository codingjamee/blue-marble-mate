import { ColorOption, colorOptions, ValueLabel } from '../constants/colors';
import { BOARD_DATA } from '../utils/mapInfo';
import { getRandomElement } from '../utils/utils';
import { PlayerNamesType, PlayerState } from './playerStore';
import { v4 as uuid } from 'uuid';

//선택 가능한 색상
const getAvailableColors = (
  usedColors: PlayerNamesType['playerColor'][],
): ColorOption['value'][] => {
  return colorOptions
    .filter((color) => !usedColors.includes(color.value))
    .map((color) => color.value);
};

//나머지 색상끼리의 랜덤
const currentPlayersColor = (state: PlayerState) => {
  const currentPlayers = [...state.playerInfos];
  return currentPlayers.map((p) => p.playerColor);
};

//숫자만큼 랜덤 컬러 가져오기
const getRandomColors = ({ number, state }: { number: number; state?: PlayerState }) => {
  const availableColors = !state
    ? colorOptions.map((color) => color.value)
    : getAvailableColors(currentPlayersColor(state));

  const randomColors = Array(number)
    .fill(null)
    .reduce<ColorOption['value'][]>((acc) => {
      const remainingColors = availableColors.filter((color) => !acc.includes(color));
      if (remainingColors.length === 0) return acc;
      acc.push(getRandomElement(remainingColors));
      return acc;
    }, []);

  return randomColors;
};

export const playerInitObj = (color: ValueLabel) => ({
  id: uuid(),
  name: '',
  property: undefined,
  luckyKeys: undefined,
  cash: 200000,
  position: {
    name: BOARD_DATA.top[0].name,
    number: BOARD_DATA.top[0].id,
  },
  isInIsland: false,
  islandTurnLeft: 0,
  playerColor: color,
  isCurrentTurn: false,
});

const getPlayerInitialize = ({ number, state }: { number: number; state?: PlayerState }) => {
  const randomColors = getRandomColors({ number, state });
  const newToAddedInit = randomColors?.map((color) => playerInitObj(color));
  return newToAddedInit;
};

const getUpdatedPlayerInit = ({ number, state }: { number: number; state: PlayerState }) => {
  //플레이어 수가 줄어든다면 맨처음부터 자르기
  const currentPlayers = [...state.playerInfos];
  if (currentPlayers.length > number) {
    return currentPlayers.slice(0, number);
  }

  //새로 추가할 initObj
  const needObjNum = number - currentPlayers.length;
  const randomColors = getRandomColors({ number: needObjNum, state });
  const newToAddedInit = randomColors?.map((color) => playerInitObj(color));

  return [...currentPlayers, ...newToAddedInit];
};

export { getAvailableColors, getPlayerInitialize, getUpdatedPlayerInit, getRandomColors };
