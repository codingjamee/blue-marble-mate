import { create } from 'zustand';
import playerStore from './playerStore';
import { PlayerNamesType } from './playerType';
import landStore from './landStore';
import { isDiceRolled, positionPendingActions } from './gamePlayLogic';
import { RollResult } from '../pages/game/hooks/useRollDice';
import { LandType } from '../utils/mapType';
import { PlayState } from './gamePlayType';

const usePlayStore = create<PlayState>()((set, get) => ({
  gamePhase: 'ROLL',
  isRolling: false,
  dices: null,
  isDouble: false,
  pendingAction: null,
  diceIsRolled: false,

  setDiceIsRolled: (diceIsRolled) => {
    console.log('setDiceIsRolled is called', diceIsRolled);
    set({ diceIsRolled });
  },
  setGamePhase: (phase) => set({ gamePhase: phase }),

  //이동처리 //월급체크해서 받기 //새로운 위치 설정 및 반환
  handleMoving: async (diceResult: RollResult) => {
    console.log('handleMoving is Called');
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

  //땅 구매, 임대료 지불, 건물 건설 등의 사용자 선택 처리
  // pendingAction 상태에 따른 적절한 액션 실행
  // 액션 완료 후 상태 초기화
  handleUserAction: async (actionType, building) => {
    console.log('handleUserAction is called 😈', actionType);
    const { pendingAction } = get();
    const currentPlayer = playerStore.getState().getNowTurn();

    if (actionType === 'SKIP') {
      return get().handleNextTurn();
    }

    if (!pendingAction || pendingAction.type !== actionType) {
      console.warn('Invalid action or no pending action');
      return;
    }

    const actionFn = {
      BUY: async () => {
        try {
          const result = await playerStore
            .getState()
            .processPayment(pendingAction.price ? -pendingAction.price : 0, currentPlayer.id);

          console.log(result, 'processPayment is Fulfilled');

          landStore.getState().updateLandOwner(pendingAction.landId, currentPlayer.id);
          playerStore.getState().updateLandOwner(pendingAction.landId, currentPlayer.id);
        } catch (error) {
          console.error('Error during buy process:', error);
        }
      },
      PAY_RENT: async () => {
        console.log('PAY_RENT is called!!!');
        if (!pendingAction.options?.owner) return console.log('owner is not exist');
        await playerStore
          .getState()
          .processPayment(
            pendingAction.price ? -pendingAction.price : 0,
            currentPlayer.id,
            pendingAction.options?.owner!,
          );
      },
      BUILD: async () => {
        console.log(building);
        if (!building) return console.log('building is undefined');
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
      FUND_RAISE: async () => {
        console.log('fund raise 👼🏻👼🏻👼🏻👼🏻👼🏻');
        playerStore.getState().processPayment(-pendingAction.fund!, currentPlayer.id);
        landStore.getState().fundRaising(currentPlayer.position, pendingAction.fund!);
      },
      FUND_RECEIVE: () => {
        console.log('fund receive 🤲🤲🤲🤲🤲🤲');
        playerStore.getState().processPayment(pendingAction.fund || 0, currentPlayer.id);
        landStore
          .getState()
          .fundRaising(currentPlayer.position, pendingAction.fund ? -pendingAction.fund : 0);
      },

      INISLAND: async () => {
        console.log('handleUserAction에서의 INISLAND 함수 호출 이러면 안됨 에러');

        return false;
      },
      GOLDEN_KEY: async () => {
        // return new Promise((resolve) => {
        //   resolve(true);
        // });
      },
    };

    try {
      await actionFn[actionType]();

      playerStore.getState().updateNestedPlayerInfo(currentPlayer.id, ['canSkipTurn'], true);
    } catch (error) {
      console.error('Action failed:', error);
      throw error;
    }
    set({ pendingAction: null });
    if (currentPlayer.doubleTurnLeft) return;

    // get().handleNextTurn();
  },

  setPendingAction: (pendingAction) => set({ pendingAction }),

  //플레이어가 도착한 칸의 타입에 따른 액션 실행
  // gamePlayLogic.ts에 정의된 positionPendingActions 실행
  handlePendingAction: async (position: LandType, currentPlayer: PlayerNamesType) => {
    const { setPendingAction, setGamePhase } = get();
    const { getAvailableBuildings } = landStore.getState();
    console.log('in handlePendingAction', position, currentPlayer);

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

  setDices: (dices) => set({ dices: dices }),

  //더블 여부에 따른 추가 턴 처리
  // 다음 플레이어로 턴 넘기기
  // 게임 페이즈 초기화
  handleNextTurn: () => {
    console.log('handleNextTurn is called');
    const { getNowTurn, nextTurn } = playerStore.getState();
    const currentPlayer = getNowTurn();

    nextTurn(currentPlayer);

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
    console.log('handleIslandTurn is called🏝️🏝️🏝️🏝️🏝️🏝️');

    const { updateNestedPlayerInfo, updateIslandTurn } = playerStore.getState();
    const { getNowTurn } = playerStore.getState();

    const curPlayer = getNowTurn();
    console.log('curPlayer.islandTurnLeft🏝️🏝️🏝️', curPlayer.islandTurnLeft);

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
        return true;
      }

      updateIslandTurn(curPlayer.id, -1);
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

      //newPosition이 플레이어의 땅일때

      await handlePendingAction(newPosition, curPlayer);
      // const updatedPendingAction = get().pendingAction;

      // if (updatedPendingAction?.type === 'PAY_RENT') {
      //   await get().handleUserAction('PAY_RENT');
      // }
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
      console.log('현재 플레이어 무인도에 있음', curPlayer.isInIsland, escapeIslandTurn, curPlayer);
      return await get().handleIslandTurn();
    }

    // 턴 시작 시 남은 더블 턴 체크 및 처리
    if (diceResult && curPlayer.doubleTurnLeft) {
      updateDouble(curPlayer.id, true, -1);
    }

    // 더블처리
    if (diceResult.isDouble) {
      await playerStore.getState().updateDouble(curPlayer.id, true, 1);
    }

    get().handleMovingAndPendingAction();
  },
}));

export default usePlayStore;
