import { useState } from 'react';
import { DiceValue } from '../DiceSvgs';

interface DicesType {
  val1: DiceValue;
  val2: DiceValue;
}

export interface RollResult {
  total: number;
  isDouble: boolean;
  values: DicesType;
}

const pickNumber = (): DiceValue => {
  return Math.floor(Math.random() * 6 + 1) as DiceValue;
};
const useRollDice = () => {
  const [dices, setDices] = useState<DicesType>({
    val1: pickNumber(),
    val2: pickNumber(),
  });
  const [isRolling, setIsRolling] = useState(false);

  const rollSingleDice = (diceKey: 'val1' | 'val2'): Promise<DiceValue> => {
    return new Promise((resolve) => {
      let currentValue = pickNumber();
      const intervalId = setInterval(() => {
        currentValue = pickNumber();
        setDices((prev) => ({ ...prev, [diceKey]: currentValue }));
      }, 50);

      setTimeout(() => {
        clearInterval(intervalId);
        resolve(currentValue);
      }, 1000);
    });
  };
  const rollDice = async (): Promise<RollResult> => {
    setIsRolling(true);

    try {
      const [val1, val2] = await Promise.all([rollSingleDice('val1'), rollSingleDice('val2')]);

      const result: RollResult = {
        total: val1 + val2,
        isDouble: val1 === val2,
        values: { val1, val2 },
      };

      setDices({ val1, val2 });
      setIsRolling(false);

      return result;
    } catch (error) {
      setIsRolling(false);
      throw error;
    }
  };

  const handleRolling = async (alterPhase: () => void) => {
    alterPhase();
    return await rollDice();
  };

  return { dices, isRolling, rollDice, isDouble: dices.val1 === dices.val2, handleRolling };
};

export default useRollDice;
