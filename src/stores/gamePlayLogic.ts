// gamePlayLogic.ts
import landStore, { hereIsFund, isThisOwnableCity } from './landStore';
import { ActionContext, GoldenActionType, PlayState } from './gamePlayType';
import playerStore from './playerStore';
import gameStore from './gameStore';
import { LuckyKey, MoveDestination } from '../data/luckyKeysType';
import { CityLandType, LandType } from '../utils/mapType';
import { PlayerNamesType } from './playerType';

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
    setPendingAction({
      type: 'PICK_GOLDEN_KEY',
      landId: position.id,
      price: 0,
      options: null,
    });
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

export const getDestinationId = (
  destination: MoveDestination,
  lands: LandType[],
  currentPlayer: PlayerNamesType,
) => {
  // 문자열인 경우 (예: '제주도', '무인도')
  if (typeof destination === 'string') {
    const targetLand = lands.find((land) => land.name === destination);
    return targetLand?.id;
  }

  // 숫자인 경우
  if (typeof destination === 'number') {
    const newPosition = (currentPlayer.position.id + destination + 40) % 40;
    return newPosition;
  }

  if (destination === 'start') {
    return 0;
  }

  return currentPlayer.position.id;
};

const keyPendingActions = (
  pickedKey: LuckyKey,
  setPendingAction: (pendingAction: PlayState['pendingAction']) => void,
  currentPlayer: PlayerNamesType,
) => {
  // const destination = pickedKey.action.destination;
  const lands = landStore.getState().lands;
  // const destinationId = getDestinationId(destination, lands, currentPlayer);
  if (pickedKey.keepable) playerStore.getState().updateLuckyKeys(pickedKey, currentPlayer.id);

  console.log('keyPendingActions is called', 'type은? ', pickedKey.action.type);

  const actions = {
    PAY: () => {
      if (pickedKey.action.type !== 'PAY') return;
      setPendingAction({
        type: 'PAY',
        landId: currentPlayer.position.id,
        price: -pickedKey.action.amount,
      });
    },
    RECEIVE: () => {
      if (pickedKey.action.type !== 'RECEIVE') return;
      setPendingAction({
        type: 'RECEIVE',
        landId: currentPlayer.position.id,
        price: pickedKey.action.amount,
      });
    },
    MOVE: () => {
      if (pickedKey.action.type !== 'MOVE') return;
      const destination = pickedKey.action.destination;
      const destinationId = getDestinationId(destination, lands, currentPlayer)!;

      setPendingAction({
        type: 'MOVE',
        landId: currentPlayer.position.id,
        position: destinationId,
      });
    },
    MOVE_WITH_PAYMENT: () => {
      if (pickedKey.action.type !== 'MOVE_WITH_PAYMENT') return;
      const destinationId = getDestinationId(pickedKey.action.destination, lands, currentPlayer);
      if (!destinationId) return;
      const rentLandId = getDestinationId(
        pickedKey.action.payment.paymentProperty.rentLandName,
        lands,
        currentPlayer,
      );

      const landsAndrentPrice = landStore
        .getState()
        .getLandOwnerAndRent(rentLandId, currentPlayer.id);

      setPendingAction({
        type: 'MOVE_WITH_PAYMENT',
        landsAndrentPrice,
        destinationId,
      });
    },

    ESCAPE: () => {
      //사용할 때 필요
      playerStore.getState().updateLuckyKeys(pickedKey, currentPlayer.id);
      return;
    },
    FREE_PASS: () => {
      //사용할 때 필요
      //양도는 나중에 구현 ...
      playerStore.getState().updateLuckyKeys(pickedKey, currentPlayer.id);
      return;
    },
    BUILDING_PAYMENT: () => {
      if (!currentPlayer.property) return;
      if (pickedKey.action.type !== 'BUILDING_PAYMENT') return;
      const rents = currentPlayer.property.map((property) => {
        const rentPrice = landStore
          .getState()
          .calculateKeyCosts(property.propertyId, pickedKey.action.costs);
        return { id: property.propertyId, rentPrice };
      });
      const total = rents.reduce((rent, price) => (rent += price.rentPrice), 0);

      setPendingAction({ type: 'BUILDING_PAYMENT', total });
    },

    SELL_BUILDING: () => {
      if (!currentPlayer.property) return console.log('소유한 재산이 없습니다.');

      const playerLands = currentPlayer.property?.map((property) => property.propertyId);
      const landsPrices = playerLands.map((land) => {
        const landInfo = landStore.getState().lands[land] as CityLandType;

        return { price: landInfo.price, id: landInfo.id };
      });

      const sellTarget = landsPrices.reduce((max, land) => (max.price > land.price ? land : max));

      //팔기
      console.log(sellTarget, '팔기 구현중');
      setPendingAction({ type: 'SELL_BUILDING', target: sellTarget });
    },

    WORLD_TOUR: () => {
      setPendingAction({ type: 'WORLD_TOUR' });

      //월급받기 구현 필요
    },
  };
  return actions[pickedKey.action.type]();
};

export { positionPendingActions, keyPendingActions };
