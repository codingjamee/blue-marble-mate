import DiceSvg from '../../assets/Dice.svg?react';
import usePlayStore from '../../stores/gamePlayStore';
import playerStore from '../../stores/playerStore';
import DiceSvgs from './DiceSvgs';
import useRollDice from './hooks/useRollDice';

const Dice = ({ isCurrentPlayerOwner }: { isCurrentPlayerOwner: boolean | null | undefined }) => {
  const {
    setGamePhase,
    handleTurn,
    handleIslandTurn,
    setDices,
    setDiceIsRolled,
    diceIsRolled,
    pendingAction,
  } = usePlayStore();
  const { dices, isRolling, isDouble, handleRolling } = useRollDice(setDices, setDiceIsRolled);
  const currentPlayer = playerStore.getState().getNowTurn();

  const rollDice = async () => {
    if (!isRolling)
      await handleRolling(() => (currentPlayer.isInIsland ? () => {} : setGamePhase('ROLL')));

    currentPlayer.isInIsland ? await handleIslandTurn() : await handleTurn();
  };

  const canRenderDice = !diceIsRolled || (isDouble && !pendingAction) || isCurrentPlayerOwner;

  return (
    <section className="dice console-container">
      {currentPlayer.isInIsland && currentPlayer.islandTurnLeft > 0 ? (
        <h3>무인도 탈출 주사위(더블이면 탈출)</h3>
      ) : (
        <h3>주사위 </h3>
      )}
      {canRenderDice && (
        <button
          className={`btn btn-common roll-dice ${isRolling ? 'disabled' : ''}`}
          onClick={rollDice}
        >
          <DiceSvg />
          <div>{isRolling ? '주사위 굴리는 중.....' : '주사위 굴리기'}</div>
        </button>
      )}
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
