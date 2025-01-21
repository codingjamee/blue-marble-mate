import DiceSvg from '../../assets/Dice.svg?react';
import DiceSvgs from './DiceSvgs';
import useRollDice from './hooks/useRollDice';
const Dice = () => {
  const { dice1, dice2, isRolling, rollDice, isDouble } = useRollDice();

  return (
    <section className="dice console-container">
      <h3>주사위 </h3>
      <button className={`btn btn-common roll-dice ${isRolling ? 'disabled' : ''}`}>
        <DiceSvg />
        <div onClick={() => rollDice()}>{isRolling ? '주사위 굴리는 중.....' : '주사위 굴리기'}</div>
      </button>
      <article className={`dice-number ${isRolling ? 'rolling' : ''}`}>
        <div>{DiceSvgs[dice1]}</div>
        <div>{DiceSvgs[dice2]}</div>
      </article>
      <div className={`double ${isRolling && 'none'}`}>{!isRolling && isDouble ? '더블입니다!' : '더블이 아닙니다'}</div>
    </section>
  );
};

export default Dice;
