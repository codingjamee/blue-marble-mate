// gamePlayLogic.ts
import landStore, { isThisOwnableCity } from './landStore';
import { PlayerNamesType } from './playerType';
import { LandType } from '../utils/mapType';
import { PlayState } from './gamePlayType';
import { RollResult } from '../pages/game/hooks/useRollDice';
import { LandState } from './landType';

interface ActionContext {
  position: LandType;
  currentPlayer: PlayerNamesType;
  setPendingAction: PlayState['setPendingAction'];
  setGamePhase?: PlayState['setGamePhase'];
  getAvailableBuildings: LandState['getAvailableBuildings'];
}

export const isDiceRolled = (dices: RollResult | null): dices is RollResult => {
  return dices !== null;
};

export function hasPrice(land: LandType): land is LandType & { price: { land: number } } {
  return 'price' in land && 'land' in land.price;
}

const positionPendingActions = {
  city: async ({
    position,
    currentPlayer,
    setPendingAction,
    getAvailableBuildings,
  }: ActionContext) => {
    const { isCurrentPlayerOwner, hasOwner, ownerId, rentPrice } = await landStore
      .getState()
      .getLandOwnerAndRent(position.id, currentPlayer.id);

    if (!isThisOwnableCity(position)) {
      console.log('Here is not A City');
      return;
    }

    console.log('hasOwner---------', hasOwner);

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
        price: rentPrice || 0,
        options: { owner: ownerId },
      });
    } else {
      //owner가 있는데 현재 플레이어인 경우
      setPendingAction({
        type: 'BUILD',
        landId: position.id,
        price: 0,
        options: {
          owner: ownerId,
          buildings: getAvailableBuildings(position.id),
        },
      });
    }
  },

  goldenKey: async ({ position, setPendingAction }: ActionContext) => {
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

export { positionPendingActions };
