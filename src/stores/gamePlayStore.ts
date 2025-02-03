import { create } from 'zustand';
import playerStore from './playerStore';
import { PlayerNamesType } from './playerType';
import landStore from './landStore';
import { positionActions } from './gamePlayLogic';
import { RollResult } from '../pages/game/hooks/useRollDice';
import { LandType } from '../utils/mapType';
import { PlayState, ActionType } from './gamePlayType';

const isDiceRolled = (dices: RollResult | null): dices is RollResult => {
  return dices !== null;
};

const usePlayStore = create<PlayState>()((set, get) => ({
  gamePhase: 'ROLL',
  isRolling: false,
  dices: null,
  isDouble: false,
  pendingAction: null,

  setGamePhase: (phase) => set({ gamePhase: phase }),

  //이동처리 //월급체크해서 받기 //새로운 위치 설정 및 반환
  handleMoving: async (diceResult: RollResult) => {
    console.log('handleMoving is Called');
    const currentPlayer = playerStore.getState().getNowTurn();
    const currentPositionInfo = currentPlayer.position;
    const newPosition = (currentPositionInfo.id + diceResult.total) % 40; // 보드의 크기에 따라 조정

    // 월급 체크
    if (newPosition < currentPositionInfo.id) {
      await playerStore.getState().processPayment(currentPlayer.id, 200000);
    }

    await playerStore.getState().updatePlayerPosition(currentPlayer.id, newPosition);
    return landStore.getState().getLandInfo(newPosition);
  },

  //땅 구매, 임대료 지불, 건물 건설 등의 사용자 선택 처리
  // pendingAction 상태에 따른 적절한 액션 실행
  // 액션 완료 후 상태 초기화
  handleUserAction: async (actionType: ActionType) => {
    const { pendingAction } = get();
    const currentPlayer = playerStore.getState().getNowTurn();

    console.log('handleUserAction is called', pendingAction);

    if (actionType === 'SKIP') {
      return get().handleNextTurn();
    }

    if (!pendingAction || pendingAction.type !== actionType) {
      console.warn('Invalid action or no pending action');
      return;
    }
    const actionFn = {
      BUY: async () => {
        await playerStore.getState().processPayment(currentPlayer.id, -pendingAction.price);
        landStore.getState().updateLandOwner(pendingAction.landId, currentPlayer.id);
      },
      PAY_RENT: async () => {
        console.log('PAY_RENT is called!!!');
        await playerStore
          .getState()
          .processPayment(currentPlayer.id, -pendingAction.price, pendingAction.options?.owner!);
      },
      BUILD: async () => {},
      SELL: async () => {},
      SKIP: async () => {
        return get().handleNextTurn();
      },
      INISLAND: async () => {
        const diceResult = get().dices;
        if (!isDiceRolled(diceResult)) {
          return;
        }

        //주사위 굴리기
        //값에 따라 다음 턴으로 돌리기 또는 inisland false로 설정
        if (diceResult.isDouble) {
          await playerStore.getState().updateNestedPlayerInfo(curPlayer.id, ['isInIsland'], false);
        }
      },
      GOLDEN_KEY: async () => {
        return undefined;
      },
    };

    await actionFn[actionType]();

    // 액션 처리 후 초기화
    set({ pendingAction: null });
    get().handleNextTurn();
  },

  setPendingAction: (pendingAction) => set({ pendingAction }),

  //플레이어가 도착한 칸의 타입에 따른 액션 실행
  // gamePlayLogic.ts에 정의된 positionActions 실행
  handlePositionAction: async (position: LandType, currentPlayer: PlayerNamesType) => {
    const { setPendingAction, setGamePhase } = get();

    const action = positionActions[position.type];
    if (action) {
      await action({ position, currentPlayer, setPendingAction, setGamePhase });
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
    const diceResult = get().dices;
    const currentPlayer = playerStore.getState().getNowTurn();
    const { updateDouble } = playerStore.getState();

    const { handleMoving, handlePositionAction } = get();

    if (!isDiceRolled(diceResult)) {
      throw new Error('Dice must be rolled before handling turn');
    }

    // 턴 시작 시 남은 더블 턴 체크 및 처리
    if (diceResult && currentPlayer.doubleTurnLeft) {
      updateDouble(currentPlayer.id, true, -1);
    }

    // 더블처리
    if (diceResult.isDouble) {
      await playerStore.getState().updateDouble(currentPlayer.id, true, 1);
    }

    const newPosition = await handleMoving(diceResult);

    if (newPosition) {
      await handlePositionAction(newPosition, currentPlayer);
      const updatedPendingAction = get().pendingAction;

      if (updatedPendingAction?.type === 'PAY_RENT') {
        await get().handleUserAction('PAY_RENT');
      }
    }
  },
}));

export default usePlayStore;
