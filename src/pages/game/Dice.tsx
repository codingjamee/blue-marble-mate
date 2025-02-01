import DiceSvg from '../../assets/Dice.svg?react';
import usePlayStore from '../../stores/gamePlayStore';
import DiceSvgs from './DiceSvgs';
import useRollDice from './hooks/useRollDice';

const Dice = () => {
  const { setGamePhase, handleTurn } = usePlayStore();
  const { dices, isRolling, isDouble, handleRolling } = useRollDice();

  return (
    <section className="dice console-container">
      <h3>주사위 </h3>
      <button
        className={`btn btn-common roll-dice ${isRolling ? 'disabled' : ''}`}
        onClick={async () => {
          !isRolling && (await handleRolling(() => setGamePhase('ROLL')));
          handleTurn();
        }}
      >
        <DiceSvg />
        <div>{isRolling ? '주사위 굴리는 중.....' : '주사위 굴리기'}</div>
      </button>
      <article className={`dice-number ${isRolling ? 'rolling' : ''}`}>
        <div>{DiceSvgs[dices.val1]}</div>
        <div>{DiceSvgs[dices.val2]}</div>
      </article>
      <div className={`double ${isRolling && 'none'}`}>
        {!isRolling && isDouble ? <h3 style={{ color: 'red' }}>더블입니다!</h3> : '더블이 아닙니다'}
      </div>
    </section>
  );
};

export default Dice;
