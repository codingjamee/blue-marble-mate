import { Dispatch, SetStateAction, useState } from 'react';
import playerStore from '../../../stores/playerStore';
import useUpdatePlayerPosition from './useUpdatePlayerPosition';

interface DicesType {
  val1: number;
  val2: number;
}

const pickNumber = () => {
  return Math.floor(Math.random() * 6 + 1);
};
const useRollDice = () => {
  const [dice1, setDice1] = useState(() => pickNumber());
  const [dice2, setDice2] = useState(() => pickNumber());
  const [isRolling, setisRolling] = useState(false);
  const { updatePosition } = useUpdatePlayerPosition();

  const dices: DicesType = {
    val1: dice1,
    val2: dice2,
  };

  const rollIntervalDice = (setDice: Dispatch<SetStateAction<number>>, value: number) => {
    const intervalId = setInterval(() => {
      const result = pickNumber();
      setDice(result);
      value = result;
    }, 50 * Math.random());

    setTimeout(() => {
      clearInterval(intervalId);
      setisRolling(false);
      setTimeout(() => {
        updatePosition({ diceNum: dices.val1 + dices.val2, isDouble: dices.val1 === dices.val2 });
      }, 0);
    }, 1000);
  };

  const rollDice = () => {
    setisRolling(true);
    rollIntervalDice(setDice1, dices.val1);
    rollIntervalDice(setDice2, dices.val2);
  };

  return { dice1, dice2, isRolling, rollDice, isDouble: dices.val1 === dices.val2 };
};

export default useRollDice;
