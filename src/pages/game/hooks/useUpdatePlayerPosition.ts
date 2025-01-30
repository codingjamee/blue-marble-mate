import { useState } from 'react';
import playerStore from '../../../stores/playerStore';
import { POSITION_DATA } from '../../../utils/mapInfo';

const useUpdatePlayerPosition = () => {
  const { updateNestedPlayerInfo, getNowTurn } = playerStore();
  const [isNeedSalary, setIsPaymentDue] = useState(false);
  const nowTurnInfo = getNowTurn();
  const updatePosition = ({ diceNum }: { diceNum: number }) => {
    //이동필요한 포지션 가져오기
    const nextPosition = POSITION_DATA.find((data) => {
      const isNextRound = nowTurnInfo.position.id + diceNum > 40;
      setIsPaymentDue(true);
      const nextPointId = isNextRound
        ? nowTurnInfo.position.id + diceNum - 40
        : nowTurnInfo.position.id + diceNum;

      return data.id === nextPointId;
    });

    if (nextPosition) {
      updateNestedPlayerInfo(nowTurnInfo.id, ['position'], {
        ...nowTurnInfo.position,
        name: nextPosition.name,
        id: nextPosition.id,
        position: 'position',
      });
    }

    return nextPosition;
  };
  return { updatePosition, isNeedSalary };
};

export default useUpdatePlayerPosition;
