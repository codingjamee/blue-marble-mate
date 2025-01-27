import { useEffect } from 'react';
import DiceSvg from '../../assets/Dice.svg?react';
import DiceSvgs from './DiceSvgs';
import useRollDice from './hooks/useRollDice';
import gameStore from '../../stores/gameStore';
const Dice = () => {
  const { dice1, dice2, isRolling, rollDice, isDouble } = useRollDice();
  const isOnline = gameStore((state) => state.isOnline);

  useEffect(() => {
    console.log('isOnline :=======>', isOnline);
  }, [isOnline]);

  return (
    <section className="dice console-container">
      <h3>주사위 </h3>
      <button
        className={`btn btn-common roll-dice ${isRolling ? 'disabled' : ''}`}
        onClick={() => {
          !isRolling && rollDice();
        }}
      >
        <DiceSvg />
        <div>{isRolling ? '주사위 굴리는 중.....' : '주사위 굴리기'}</div>
      </button>
      <article className={`dice-number ${isRolling ? 'rolling' : ''}`}>
        <div>{DiceSvgs[dice1]}</div>
        <div>{DiceSvgs[dice2]}</div>
      </article>
      <div className={`double ${isRolling && 'none'}`}>
        {!isRolling && isDouble ? <h3 style={{ color: 'red' }}>더블입니다!</h3> : '더블이 아닙니다'}
      </div>
    </section>
  );
};

export default Dice;
