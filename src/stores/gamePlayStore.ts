import { create } from 'zustand';
import playerStore from './playerStore';
import { PlayerNamesType } from './playerType';
import landStore from './landStore';
import { getDestinationId, keyPendingActions, positionPendingActions } from './gamePlayLogic';
import { isActionType, isDiceRolled } from './gamePlayType';
import { RollResult } from '../pages/game/hooks/useRollDice';
import { LandType } from '../utils/mapType';
import { PlayState } from './gamePlayType';
import { getRandomElement } from '../utils/utils';
import { LUCKY_KEYS } from '../data/luckyKeys';

const usePlayStore = create<PlayState>()((set, get) => ({
  gamePhase: 'ROLL',
  isRolling: false,
  dices: null,
  isDouble: false,
  pendingAction: null,
  diceIsRolled: false,
  pickedKey: null,

  setDiceIsRolled: (diceIsRolled) => {
    set({ diceIsRolled });
  },
  setPickedKey: (key) => set({ pickedKey: key }),
  setGamePhase: (phase) => set({ gamePhase: phase }),

  //이동처리 //월급체크해서 받기 //새로운 위치 설정 및 반환
  handleMoving: async (diceResult: RollResult) => {
    const currentPlayer = playerStore.getState().getNowTurn();
    const currentPositionInfo = currentPlayer.position;
    const newPosition = (currentPositionInfo.id + diceResult.total) % 40; // 보드의 크기에 따라 조정

    // 월급 체크
    if (newPosition < currentPositionInfo.id) {
      await playerStore.getState().processPayment(200000, currentPlayer.id);
    }

    await playerStore.getState().updatePlayerPosition(currentPlayer.id, newPosition);
    return landStore.getState().getLandInfo(newPosition);
  },

  handleGoldenKeyPick: async () => {
    //goldenKey를 선택하고 업데이트
    const newKey = getRandomElement(LUCKY_KEYS);
    set({ pickedKey: newKey });
  },

  getGoldenKeyActionHandler: () => {
    const { pendingAction, pickedKey } = get();
    const currentPlayer = playerStore.getState().getNowTurn();

    if (!pendingAction) console.warn('pendingAction is null', pendingAction);
    if (!pickedKey) return console.warn('');
    return () =>
      get().goldenKeyHandlers[pickedKey.action.type](pickedKey, currentPlayer, pendingAction);
  },
  goldenKeyHandlers: {
    MOVE_WITH_PAYMENT: async (pickedKey, currentPlayer) => {
      if (!pickedKey || pickedKey.action.type !== 'MOVE_WITH_PAYMENT') return;

      const lands = landStore.getState().lands;
      const destinationId = getDestinationId(pickedKey.action.destination, lands, currentPlayer);
      if (!destinationId) return;

      const rentLandName = pickedKey.action.payment.paymentProperty.rentLandName;
      const rentLandId = getDestinationId(rentLandName, lands, currentPlayer);
      if (!rentLandId) return console.warn('rentLandId is undefined');
      const landsAndrentPrice = landStore
        .getState()
        .getLandOwnerAndRent(rentLandId, currentPlayer.id);

      await playerStore.getState().updatePlayerPosition(currentPlayer.id, destinationId);

      if (landsAndrentPrice && landsAndrentPrice.hasOwner && landsAndrentPrice.ownerId) {
        const { useRentPrice } = pickedKey.action.payment.paymentProperty;
        const rent = useRentPrice ? landsAndrentPrice.rentPrice : 0;
        const toId = useRentPrice ? landsAndrentPrice.ownerId : undefined;

        await playerStore.getState().processPayment(rent || 0, currentPlayer.id, toId);
      }

      // 월급 체크
      if (pickedKey.action.checkPassStart) {
        const pay = landStore.getState().calculatePayWarp(currentPlayer.position.id, destinationId);
        if (pay) {
          await playerStore.getState().processPayment(200000, currentPlayer.id);
        }
      }
    },
    RECEIVE: async (_, currentPlayer) => {
      playerStore.getState().processPayment(100000, currentPlayer.id);
    },
    PAY: async (_, currentPlayer, pendingAction) => {
      console.log('황금열쇠 pay 실행');
      playerStore.getState().processPayment(pendingAction?.price || 0, currentPlayer.id);
    },
    BUILDING_PAYMENT: async (_, currentPlayer, pendingAction) => {
      console.log('황금열쇠 건물 페이 실행');
      playerStore.getState().processPayment(pendingAction?.total || 0, currentPlayer.id);
    },
    SELL_BUILDING: async (_, _2, pendingAction) => {
      console.log('sell building action실행, ');
      console.log('팔 물건', pendingAction?.target, '타입', pendingAction?.type);
    },
    MOVE: async (_, currentPlayer, pendingAction) => {
      console.log('MOVE is called');
      if (!pendingAction?.position) return console.warn('pendingAction.position is undefined');
      playerStore.getState().updatePlayerPosition(currentPlayer.id, pendingAction?.position);
    },
    WORLD_TOUR: async (_, currentPlayer, pendingAction) => {
      get().actionHandlers['FUND_RECEIVE'](pendingAction, currentPlayer);
    },
    ESCAPE: async () => {},
    FREE_PASS: async () => {},
  },

  actionHandlers: {
    BUY: async (pendingAction, currentPlayer) => {
      if (!pendingAction) return;
      try {
        const result = await playerStore
          .getState()
          .processPayment(pendingAction.price ? -pendingAction.price : 0, currentPlayer.id);

        console.log(result, 'processPayment is Fulfilled');
        if (!pendingAction?.landId) return console.warn('pendingAction.landId is undefined');

        landStore.getState().updateLandOwner(pendingAction.landId, currentPlayer.id);
        playerStore.getState().updateLandOwner(pendingAction.landId, currentPlayer.id);
      } catch (error) {
        console.error('Error during buy process:', error);
      }
    },
    PAY_RENT: async (pendingAction, currentPlayer) => {
      if (!pendingAction) return;
      if (!pendingAction.options?.owner) return console.log('owner is not exist');
      await playerStore
        .getState()
        .processPayment(
          pendingAction.price ? -pendingAction.price : 0,
          currentPlayer.id,
          pendingAction.options?.owner!,
        );
    },
    BUILD: async (pendingAction, currentPlayer, building) => {
      if (!pendingAction) return console.warn('pending action is undefined');
      console.log(building);
      if (!building) return console.warn('building is undefined');
      if (!pendingAction?.landId) return console.warn('pendingAction.landId is undefined');

      landStore.getState().updateBuildings(pendingAction.landId, building);
      playerStore.getState().constructBuilding(pendingAction.landId, currentPlayer.id, building);
    },
    SELL: async () => {
      // return new Promise((resolve) => {
      //   resolve(true);
      // });
    },
    SKIP: async () => {
      return get().handleNextTurn();
    },
    FUND_RAISE: async (pendingAction, currentPlayer, _, _2) => {
      if (!pendingAction) return;
      playerStore.getState().processPayment(-pendingAction.fund!, currentPlayer.id);
      landStore.getState().fundRaising(currentPlayer.position, pendingAction.fund!);
    },
    FUND_RECEIVE: async (pendingAction, currentPlayer, _, _2) => {
      if (!pendingAction) return;
      playerStore.getState().processPayment(pendingAction.fund || 0, currentPlayer.id);
      landStore
        .getState()
        .fundRaising(currentPlayer.position, pendingAction.fund ? -pendingAction.fund : 0);
    },

    INISLAND: async () => {
      console.log('handleUserAction에서의 INISLAND 함수 호출 이러면 안됨 에러');

      return;
    },
    // GOLDEN_KEY: async () => {
    //   //황금열쇠 뽑기 및 그에따른 다음 액션 설정
    //   //
    //   playerStore.getState().updateNestedPlayerInfo(currentPlayer.id, ['canSkipTurn'], true);
    //   return;
    // },
    PICK_GOLDEN_KEY: async (_, currentPlayer, _2, _3) => {
      const pickedKey = getRandomElement(LUCKY_KEYS);
      set({ pickedKey, pendingAction: null });

      const setPendingAction = get().setPendingAction;

      //key에따른 펜딩액션 설정
      keyPendingActions(pickedKey, setPendingAction, currentPlayer);
    },

    SPACE_MOVE: async (pendingAction, currentPlayer, _, warpPositionId) => {
      //우주여행일 때 컬럼비아호 소유주에게 20만원지급
      if (!pendingAction) return;

      if (pendingAction.options?.owner) {
        playerStore
          .getState()
          .processPayment(pendingAction.price || 0, currentPlayer.id, pendingAction.options?.owner);
      }
      //원하는 위치로 이동
      if (warpPositionId) {
        playerStore.getState().updatePlayerPosition(currentPlayer.id, warpPositionId);
        const calculatePayWarp = landStore.getState().calculatePayWarp;
        if (calculatePayWarp(currentPlayer.position.id, warpPositionId)) {
          //시작점 지나면 월급주기
          await playerStore.getState().processPayment(200000, currentPlayer.id);
        }
      }
    },
  },
  //땅 구매, 임대료 지불, 건물 건설 등의 사용자 선택 처리
  // pendingAction 상태에 따른 적절한 액션 실행
  // 액션 완료 후 상태 초기화
  handleUserAction: async (actionType, building, warpPositionId) => {
    console.log('handleUserAction is called 😈', actionType);
    const { pendingAction } = get();
    const currentPlayer = playerStore.getState().getNowTurn();

    if (actionType === 'SKIP') {
      return get().handleNextTurn();
    }

    if (actionType === 'PICK_GOLDEN_KEY') {
      console.log('0 : Executing golden key action:', actionType);
      get().handleGoldenKeyPick();
      const pickedKey = get().pickedKey;

      console.log('1 : 고른 goldenKey', pickedKey?.contents, pickedKey?.action.type);
      console.log('2 : goldenKey pick is success');

      const newKey = pickedKey!;
      const setPendingAction = get().setPendingAction;
      const currentPlayer = playerStore.getState().getNowTurn();

      keyPendingActions(newKey, setPendingAction, currentPlayer);
      console.log('3 : pendingAction 설정 완료');

      get().getGoldenKeyActionHandler();

      return;
    }

    if (!pendingAction || pendingAction.type !== actionType) {
      console.log({ pendingAction, actionType });
      console.warn('Invalid action or no pending action');
      return;
    }

    const actionFn = isActionType(actionType)
      ? () =>
          get().actionHandlers[actionType](pendingAction, currentPlayer, building, warpPositionId)
      : () => {
          const pickedKey = get().pickedKey;
          if (!pickedKey) return console.warn('picked Key is null');
          return get().goldenKeyHandlers[pickedKey.action.type](
            pickedKey,
            currentPlayer,
            pendingAction,
          );
        };

    try {
      await actionFn();

      playerStore.getState().updateNestedPlayerInfo(currentPlayer.id, ['canSkipTurn'], true);
    } catch (error) {
      console.error('Action failed:', error);
      throw error;
    }
    set({ pendingAction: null });
    if (currentPlayer.doubleTurnLeft) return;

    // get().handleNextTurn();
  },

  setPendingAction: (pendingAction) => {
    console.log('setPendingAction is called');
    set({ pendingAction });
  },

  //플레이어가 도착한 칸의 타입에 따른 액션 실행
  // gamePlayLogic.ts에 정의된 positionPendingActions 실행
  handlePendingAction: async (position: LandType, currentPlayer: PlayerNamesType) => {
    const { setPendingAction, setGamePhase } = get();
    const { getAvailableBuildings } = landStore.getState();

    const action = positionPendingActions[position.type];
    try {
      if (action) {
        await action({
          position,
          currentPlayer,
          setPendingAction,
          setGamePhase,
          getAvailableBuildings,
        });
      }
    } catch (err) {
      throw new Error(`err ocurred, ${err}`);
    }
  },

  setDices: (dices) => {
    const currentPlayer = playerStore.getState().getNowTurn();
    playerStore.getState().updateNestedPlayerInfo(currentPlayer.id, ['canSkipTurn'], false);

    set({ dices: dices });
  },

  //더블 여부에 따른 추가 턴 처리
  // 다음 플레이어로 턴 넘기기
  // 게임 페이즈 초기화
  handleNextTurn: () => {
    const { getNowTurn, nextTurn } = playerStore.getState();
    const currentPlayer = getNowTurn();

    nextTurn(currentPlayer);

    set({ pendingAction: null });
    set({ gamePhase: 'ROLL' });
    set({ diceIsRolled: false });
  },

  validateAndResetDice: () => {
    const { dices: diceResult, diceIsRolled } = get();

    if (!isDiceRolled(diceResult) || !diceIsRolled) {
      throw new Error('Dice must be rolled before handling turn');
    }
  },

  handleIslandTurn: async () => {
    const { updateNestedPlayerInfo, updateIslandTurn } = playerStore.getState();
    const { getNowTurn } = playerStore.getState();

    const curPlayer = getNowTurn();

    if (curPlayer.isInIsland) {
      const diceResult = get().dices;
      const diceIsRolled = get().diceIsRolled;

      if (curPlayer.islandTurnLeft === 0) {
        //islandLeft턴을 소진하여 탈출 턴임

        updateNestedPlayerInfo(curPlayer.id, ['isInIsland'], false);
        updateNestedPlayerInfo(curPlayer.id, ['islandTurnLeft'], 0);
        return await get().handleMovingAndPendingAction();
      }

      //탈출시 다른 액션으로 넘기기

      if (!isDiceRolled(diceResult) || !diceIsRolled) {
        throw new Error('주사위를 굴려주세요');
      }

      //double일 경우 탈출
      if (diceResult.isDouble) {
        updateNestedPlayerInfo(curPlayer.id, ['isInIsland'], false);
        updateNestedPlayerInfo(curPlayer.id, ['islandTurnLeft'], 0);
        get().handleNextTurn();
      }

      if (curPlayer.islandTurnLeft === 1) {
        //1일경우 다음에 탈출함
        updateNestedPlayerInfo(curPlayer.id, ['isInIsland'], false);
      }
      if (!diceResult.isDouble) updateIslandTurn(curPlayer.id, -1);
    }

    get().handleNextTurn();
  },

  handleMovingAndPendingAction: async () => {
    const { getNowTurn } = playerStore.getState();
    const { dices: diceResult, handleMoving, handlePendingAction } = get();

    if (!diceResult) throw Error('dice result is undefined');
    const curPlayer = getNowTurn();

    const newPosition = await handleMoving(diceResult);

    if (newPosition) {
      //무인도 새로 진입시
      if (newPosition.type === 'island') {
        console.log('newPositionType이 island임!', newPosition);
        //해당 플레이어 isInIsland 및 islandTurnLeft 상태 업데이트
        playerStore.getState().updateFirstIslandState(curPlayer.id);
        return get().handleNextTurn();
      }

      await handlePendingAction(newPosition, curPlayer);
    }
  },

  // 턴의 전체 흐름을 제어하는 메인 메서드
  // 순서:
  // 1. 무인도 상태 체크
  // 2. 주사위 굴리기
  // 3. 더블 처리
  // 4. 이동 처리
  // 5. 위치 기반 액션 실행
  // 6. 다음 턴 진행

  handleTurn: async () => {
    const { getNowTurn, updateDouble } = playerStore.getState();
    const { dices: diceResult, validateAndResetDice } = get();
    const curPlayer = getNowTurn();

    if (!diceResult) throw Error('dice result is undefined');

    validateAndResetDice();

    // 무인도 처리
    const escapeIslandTurn = curPlayer.islandTurnLeft === 0;
    if (curPlayer.isInIsland && !escapeIslandTurn) {
      //기존에 island에 있는 경우 (turn 2부터)
      return await get().handleIslandTurn();
    }

    // 턴 시작 시 남은 더블 턴 체크 및 처리
    if (diceResult && curPlayer.doubleTurnLeft) {
      updateDouble(curPlayer.id, true, -1);
    }

    // 더블처리
    if (diceResult.isDouble) {
      playerStore.getState().updateNestedPlayerInfo(curPlayer.id, ['canSkipTurn'], false);
      await playerStore.getState().updateDouble(curPlayer.id, true, 1);
    }

    get().handleMovingAndPendingAction();
  },
}));

export default usePlayStore;
