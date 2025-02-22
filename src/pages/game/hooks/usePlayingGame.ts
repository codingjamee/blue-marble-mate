// import { useState } from 'react';
// import useGoldenKey from './useGoldenKey';
// import useIslandLogic from './useIslandLogic';
// import useLandOwnership from './useLandOwnership';
// import useRollDice, { RollResult } from './useRollDice';
// import useUpdatePlayerPosition from './useUpdatePlayerPosition';
// import { NationType } from '../../../utils/mapInfo';
// import usePayment from './usePayment';
// import playerStore from '../../../stores/playerStore';

// //삭제예정
// const usePlayingGame = () => {
//   const { updateNestedPlayerInfo, getNowTurn, updateDouble, nextTurn } = playerStore();
//   const nowTurnInfo = getNowTurn();
//   const [gamePhase, setGamePhase] = useState<'ROLL' | 'MOVE' | 'ACTION' | 'END_TURN'>('ROLL');

//   const { isRolling, handleRolling, isDouble, dices } = useRollDice();
//   const { updatePosition, isNeedSalary } = useUpdatePlayerPosition();
//   const { checkLandOwner } = useLandOwnership();
//   const { handlePayment } = usePayment();

//   const { drawGoldenKey } = useGoldenKey();
//   const { handleIsland } = useIslandLogic(nowTurnInfo, updateNestedPlayerInfo);

//   const positionActions = {
//     city: async (position: NationType) => await checkLandOwner(position),
//     goldenKey: async () => await drawGoldenKey(),
//     island: async () => await handleIsland(),
//     special: async () => {},
//     'k-city': async (position: NationType) => await checkLandOwner(position),
//     airport: async (position: NationType) => await checkLandOwner(position),
//     fund: async () => {},
//     start: async () => {},
//     space: async () => {},
//   };

//   const handlePositionAction = async (position: NationType) => {
//     console.log('handlePositionAction is called!!!!!!!!!!');

//     const action = positionActions[position.type];
//     if (action) {
//       await action(position);
//     }
//   };

//   const handleMoving = async (alterPhase: () => void, diceResult: RollResult) => {
//     alterPhase();
//     const newPosition = await updatePosition({
//       diceNum: diceResult.total,
//     });
//     return newPosition;
//   };

//   const handleNextTurn = (diceResult) => {
//     //turn이 남아있는지 확인 (더블일 경우)
//     if (diceResult.isDouble && nowTurnInfo.doubleTurnLeft) {
//       //다음 턴으로 넘기지 않기
//       console.log('현재 턴에 doubleTurn이 남아있음');
//       return updateDouble(nowTurnInfo.id, isDouble, -1);
//     }
//     //모든 액션이 끝나면 turn을 업데이트

//     nextTurn(nowTurnInfo);
//   };

//   const handleTurn = async () => {
//     //무인도일 경우 다음턴으로 넘기기
//     const diceResult = await handleRolling(() => setGamePhase('ROLL'));
//     if (diceResult.isDouble) updateDouble(nowTurnInfo.id, isDouble, 1);

//     const newPosition = await handleMoving(() => setGamePhase('MOVE'), diceResult);

//     if (isNeedSalary) handlePayment(nowTurnInfo.id, 200000);

//     if (newPosition) await handlePositionAction(newPosition);

//     handleNextTurn(diceResult);
//   };

//   return {
//     handleTurn,
//     isRolling,
//     isDouble,
//     dices,
//     gamePhase,
//   };
// };

// export default usePlayingGame;
