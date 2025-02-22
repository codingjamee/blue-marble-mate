import Dice1 from '../../assets/Dice1.svg?react';
import Dice2 from '../../assets/Dice2.svg?react';
import Dice3 from '../../assets/Dice3.svg?react';
import Dice4 from '../../assets/Dice4.svg?react';
import Dice5 from '../../assets/Dice5.svg?react';
import Dice6 from '../../assets/Dice6.svg?react';

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
type DiceSvgsType = Record<DiceValue, JSX.Element>;

const DiceSvgs: DiceSvgsType = {
  1: <Dice1 />,
  2: <Dice2 />,
  3: <Dice3 />,
  4: <Dice4 />,
  5: <Dice5 />,
  6: <Dice6 />,
};

export default DiceSvgs;
