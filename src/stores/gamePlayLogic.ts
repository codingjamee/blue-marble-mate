// gamePlayLogic.ts
import landStore, { isThisCity } from './landStore';
import gameStore from './gameStore';
// import { calculateBuildingPrice, getAvailableBuildings } from '../utils/buildingUtils';
import { PlayerNamesType } from './playerType';
import { BuildingRentType, LandType } from '../utils/mapType';
import { PlayState } from './gamePlayType';
import { RollResult } from '../pages/game/hooks/useRollDice';

interface ActionContext {
  position: LandType;
  currentPlayer: PlayerNamesType;
  setPendingAction: PlayState['setPendingAction'];
  setGamePhase?: PlayState['setGamePhase'];
}

export const isDiceRolled = (dices: RollResult | null): dices is RollResult => {
  return dices !== null;
};

export function hasPrice(land: LandType): land is LandType & { price: { land: number } } {
  return 'price' in land && 'land' in land.price;
}

const getAvailableBuildings = (id: number): BuildingRentType[] => {
  return ['villa1'];
};

const positionPendingActions = {
  city: async ({ position, currentPlayer, setPendingAction }: ActionContext) => {
    const { isCurrentPlayerOwner, hasOwner, ownerId, rentPrice } = await landStore
      .getState()
      .getLandOwnerAndRent(position.id, currentPlayer.id);

    if (!isThisCity(position)) {
      throw new Error('Here is not A City');
    }

    if (!hasOwner) {
      //owner가 없는 경우
      setPendingAction({
        type: 'BUY',
        landId: position.id,
        price: position.price.land,
      });
    } else if (hasOwner && !isCurrentPlayerOwner) {
      //owner가 있는데 현재 플레이어가 아닌경우
      console.log({ hasOwner, isCurrentPlayerOwner });
      setPendingAction({
        type: 'PAY_RENT',
        landId: position.id,
        price: rentPrice,
        options: { owner: ownerId },
      });
    } else {
      //owner가 있는데 현재 플레이어인 경우
      setPendingAction({
        type: 'BUILD',
        landId: position.id,
        price: 0,
        options: {
          buildings: getAvailableBuildings(position.id),
        },
      });
    }
  },

  goldenKey: async ({ position, currentPlayer, setPendingAction }: ActionContext) => {
    // 골든키 로직
    setPendingAction({
      type: 'GOLDEN_KEY',
      landId: position.id,
      price: 0,
      options: null,
    });
  },

  island: async ({ position, setPendingAction, setGamePhase }: ActionContext) => {
    setPendingAction({
      type: 'INISLAND',
      landId: position.id,
      price: 0,
      options: null,
    });
    setGamePhase && setGamePhase('INISLAND');

    return;
  },

  airport: async (context: ActionContext) => {
    // 공항 로직
    return positionPendingActions.city(context);
  },

  fund: async () => {},
  start: async () => {},
  space: async () => {},
} as const;

// gameStore나 다른 store에서 사용할 때
// handlePositionAction: async (position: NationData, currentPlayer: PlayerNamesType) => {
//   const action = positionActions[position.type];
//   if (action) {
//     await action({
//       position,
//       currentPlayer,
//       setPendingAction: get().setPendingAction
//     });
//   }
// }

export { positionPendingActions };
