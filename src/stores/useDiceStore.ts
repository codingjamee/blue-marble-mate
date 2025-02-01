// diceStore.ts
import { create } from 'zustand';
import { DiceValue } from '../pages/game/DiceSvgs';

interface DicesType {
  val1: DiceValue;
  val2: DiceValue;
}

export interface RollResult {
  total: number;
  isDouble: boolean;
  values: DicesType;
}

interface DiceState {
  dices: DicesType;
  isRolling: boolean;
  isDouble: boolean;
  setDices: (dices: DicesType | Partial<DicesType>) => void;
  setIsRolling: (isRolling: boolean) => void;
  setIsDouble: (dices: DicesType) => void;
  rollDice: () => Promise<RollResult>;
  handleRolling: (alterPhase: () => void) => Promise<RollResult>;
}

const pickNumber = (): DiceValue => {
  return Math.floor(Math.random() * 6 + 1) as DiceValue;
};

const rollSingleDice = (
  setDices: (dices: DicesType | Partial<DicesType>) => void,
  diceKey: keyof DicesType,
): Promise<DiceValue> => {
  return new Promise((resolve) => {
    let currentValue = pickNumber();
    const intervalId = setInterval(() => {
      currentValue = pickNumber();
      setDices({ [diceKey]: currentValue });
    }, 50);

    setTimeout(() => {
      clearInterval(intervalId);
      resolve(currentValue);
    }, 1000);
  });
};

const useDiceStore = create<DiceState>((set, get) => ({
  dices: {
    val1: pickNumber(),
    val2: pickNumber(),
  },
  isRolling: false,
  isDouble: false,

  setDices: (dices) =>
    set((state) => ({
      dices: { ...state.dices, ...dices },
    })),
  setIsRolling: (isRolling) => set({ isRolling }),
  setIsDouble: (dices) => set({ isDouble: dices.val1 === dices.val2 }),

  rollDice: async () => {
    const { setDices, setIsRolling, setIsDouble } = get();
    setIsRolling(true);

    try {
      const [val1, val2] = await Promise.all([
        rollSingleDice(setDices, 'val1'),
        rollSingleDice(setDices, 'val2'),
      ]);

      const result: RollResult = {
        total: val1 + val2,
        isDouble: val1 === val2,
        values: { val1, val2 },
      };

      setDices({ val1, val2 });
      setIsDouble({ val1, val2 });
      setIsRolling(false);

      return result;
    } catch (error) {
      setIsRolling(false);
      throw error;
    }
  },

  handleRolling: async (alterPhase) => {
    alterPhase();
    return await get().rollDice();
  },
}));

export default useDiceStore;
