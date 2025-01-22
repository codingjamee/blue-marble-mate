import dayjs from 'dayjs';
import { getFormatDate } from './getDate';
import { gameRandom } from '../data/nameRandom';

const generateRandomGameName = () => {
  const nowFormattedDate = getFormatDate(dayjs(new Date()));

  const GAME_NAMING_DATA = [...gameRandom];
  const randomNumber = Math.floor(Math.random() * GAME_NAMING_DATA.length);

  return `${nowFormattedDate} ${GAME_NAMING_DATA[randomNumber]} 부루마불 게임`;
};

export { generateRandomGameName };
