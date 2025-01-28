import { useState } from 'react';
import useGoldenKey from './useGoldenKey';
import useIslandLogic from './useIslandLogic';
import useLandOwnership from './useLandOwnership';
import useRollDice from './useRollDice';
import useUpdatePlayerPosition from './useUpdatePlayerPosition';
import { NationData } from '../../../utils/mapInfo';

const usePlayingGame = () => {
  const { rollDice, isRolling } = useRollDice();
  const { updatePosition } = useUpdatePlayerPosition();
  const { checkLandOwner } = useLandOwnership();
  const { drawGoldenKey } = useGoldenKey();
  const { handleIsland } = useIslandLogic();

  const [gamePhase, setGamePhase] = useState<'ROLL' | 'MOVE' | 'ACTION' | 'END_TURN'>('ROLL');

  const positionActions = {
    city: async (position: NationData) => await checkLandOwner(position),
    goldenKey: async () => await drawGoldenKey(),
    island: async () => await handleIsland(),
    special: async () => {},
    'k-city': async (position: NationData) => await checkLandOwner(position),
    airport: async (position: NationData) => await checkLandOwner(position),
    fund: async () => {},
    start: async () => {},
    space: async () => {},
  };

  const handlePositionAction = async (position: NationData) => {
    const action = positionActions[position.type];
    if (action) {
      await action(position);
    }
  };

  const handleDiceRoll = async () => {
    setGamePhase('ROLL');
    const diceResult = await rollDice();

    setGamePhase('MOVE');
    const newPosition = await updatePosition({
      diceNum: diceResult.total,
      isDouble: diceResult.isDouble,
    });

    if (newPosition) await handlePositionAction(newPosition);
  };

  return {
    handleDiceRoll,
    isRolling,
    gamePhase,
  };
};

export default usePlayingGame;
