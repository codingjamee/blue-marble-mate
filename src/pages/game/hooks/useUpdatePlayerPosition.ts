import playerStore from '../../../stores/playerStore';

const useUpdatePlayerPosition = () => {
  const { getNowTurnId, updatePlayer } = playerStore();
  const nowId = getNowTurnId();
  const updatePosition = ({ diceNum, isDouble }: { diceNum: number; isDouble: boolean }) => {
    updatePlayer(nowId, ['position', 'number'], diceNum);
    if (isDouble) {
      updatePlayer(nowId, ['isDouble'], true);
      updatePlayer(nowId, ['doubleTurnLeft'], 1);
    }
  };
  // updatePlayer(nowId, { player: { position: { number: diceNum } } });
  return { updatePosition };
};

export default useUpdatePlayerPosition;
