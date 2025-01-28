import playerStore from '../../../stores/playerStore';
import { POSITION_DATA } from '../../../utils/mapInfo';

const useUpdatePlayerPosition = () => {
  const { updatePlayer, getNowTurn } = playerStore();
  const nowTurnInfo = getNowTurn();
  const updatePosition = ({ diceNum, isDouble }: { diceNum: number; isDouble: boolean }) => {
    //이동필요한 포지션 가져오기
    const nextPosition = POSITION_DATA.find((data) => {
      return data.id === nowTurnInfo.position.id + diceNum;
    });
    if (nextPosition) {
      updatePlayer(nowTurnInfo.id, ['position'], {
        ...nowTurnInfo.position,
        name: nextPosition.name,
        id: nextPosition.id,
        position: 'position',
      });
    }

    if (isDouble) {
      updatePlayer(nowTurnInfo.id, ['isDouble'], true);
      updatePlayer(nowTurnInfo.id, ['doubleTurnLeft'], 1);
    }

    return nextPosition;
  };
  return { updatePosition };
};

export default useUpdatePlayerPosition;
