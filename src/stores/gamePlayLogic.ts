// gamePlayLogic.ts
import landStore, { hereIsFund, isThisOwnableCity } from './landStore';
import { ActionContext } from './gamePlayType';
import playerStore from './playerStore';
import gameStore from './gameStore';

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

      playerStore.getState().updateNestedPlayerInfo(currentPlayer.id, ['canSkipTurn'], true);
    }
  },

  fund: async ({ position, setPendingAction }: ActionContext) => {
    if (hereIsFund(position)) {
      setPendingAction({
        type: 'FUND_RECEIVE',
        landId: position.id,
        fund: position.fund,
      });
      return;
    }
  },
  fundRaise: async ({ position, setPendingAction }: ActionContext) => {
    if (hereIsFund(position)) {
      setPendingAction({
        type: 'FUND_RAISE',
        landId: position.id,
        fund: 200000,
      });
      return;
    }
  },

  goldenKey: async ({ position, setPendingAction }: ActionContext) => {
    // 골든키 로직
    // setPendingAction({
    //   type: 'GOLDEN_KEY',
    //   landId: position.id,
    //   price: 0,
    //   options: null,
    // });
    return;
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

  start: async () => {},
  space: async ({ position, setPendingAction }: ActionContext) => {
    const colombiaInfo = gameStore
      .getState()
      .lands.filter(isThisOwnableCity)
      .find((land) => land.name === '컬럼비아호')!;

    setPendingAction({
      type: 'SPACE_MOVE',
      landId: position.id,
      price: colombiaInfo.rentPrice.land,
      options: { owner: colombiaInfo.owner },
    });
  },
} as const;

export { positionPendingActions };
