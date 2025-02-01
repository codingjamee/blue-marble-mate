import { create } from 'zustand';
import { NationType } from '../utils/mapInfo';
import playerStore, { PlayerNamesType } from './playerStore';
import landStore from './landStore';
import { positionActions } from './gamePlayLogic';
import { RollResult } from '../pages/game/hooks/useRollDice';
// import { RollResult } from '../types/dice';
// import { handleGoldenKey } from '../utils/goldenKeyLogic';

type ActionType = 'BUY' | 'BUILD' | 'PAY_RENT' | 'SELL';

interface PlayState {
  // 게임 진행 상태
  gamePhase: 'ROLL' | 'MOVE' | 'ACTION' | 'END_TURN';
  isRolling: boolean;
  dices: RollResult | null;
  isDouble: boolean;
  pendingAction: {
    type: ActionType;
    landId: NationType['id'];
    price: NationType['price'];
  } | null;

  // 주사위 관련 액션
  setGamePhase: (phase: PlayState['gamePhase']) => void;
  setDices: (dices: RollResult) => void;
  // handleRolling: () => Promise<RollResult>;

  // 이동 관련 액션
  handleMoving: (diceResult: RollResult) => Promise<NationType | null>;
  handlePositionAction: (position: NationType, currentPlayer: PlayerNamesType) => Promise<void>;

  // 턴 관련 액션
  handleTurn: () => Promise<void>;
  handleUserAction: (actionType: ActionType, accept: boolean) => Promise<void>;
  handleNextTurn: (diceResult: RollResult) => void;
}

type PositionAction<T extends NationType['type']> = T extends 'city' | 'k-city' | 'airport'
  ? (pos: NationType) => Promise<void>
  : () => Promise<void>;

type PositionActions = {
  [K in NationType['type']]: PositionAction<K>;
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
  handleUserAction: async (actionType: ActionType, accept: boolean) => {
    const { pendingAction } = get();
    const currentPlayer = playerStore.getState().getNowTurn();

    if (!pendingAction || pendingAction.type !== actionType) return;

    const actionFn = {
      BUY: async () => {
        await playerStore.getState().processPayment(currentPlayer.id, -pendingAction.price);
        get().updateLandOwner(pendingAction.landId, currentPlayer.id);
      },
      PAY_RENT: async () => {
        await playerStore
          .getState()
          .handlePayment(currentPlayer.id, pendingAction.options?.owner!, pendingAction.price);
      },
      BUILD: async () => {},
      SELL: async () => {},
    };

    accept && (await actionFn[actionType]());

    // 액션 처리 후 초기화
    set({ pendingAction: null });
  },

  //플레이어가 도착한 칸의 타입에 따른 액션 실행
  // gamePlayLogic.ts에 정의된 positionActions 실행
  handlePositionAction: async (position: NationType, currentPlayer: PlayerNamesType) => {
    const action = positionActions[position.type];
    if (action) {
      await action(position);
    }
  },

  setDices: (dices) => set({ dices: dices }),

  //더블 여부에 따른 추가 턴 처리
  // 다음 플레이어로 턴 넘기기
  // 게임 페이즈 초기화
  handleNextTurn: (diceResult) => {
    const { getNowTurn, updateDouble, nextTurn } = playerStore.getState();
    const currentPlayer = getNowTurn();

    if (diceResult.isDouble && currentPlayer.doubleTurnLeft) {
      updateDouble(currentPlayer.id, true, -1);
    } else {
      nextTurn(currentPlayer);
    }

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
    const { handleMoving, handlePositionAction, handleNextTurn } = get();

    const currentPlayer = playerStore.getState().getNowTurn();

    // 무인도 체크
    if (currentPlayer.isInIsland) {
      if (diceResult.isDouble) {
        await playerStore
          .getState()
          .updateNestedPlayerInfo(currentPlayer.id, ['isInIsland'], false);
      }
      handleNextTurn(diceResult);
      return;
    }

    // 더블 처리
    if (diceResult.isDouble) {
      await playerStore.getState().updateDouble(currentPlayer.id, true, 1);
    }

    const newPosition = await handleMoving(diceResult);

    if (newPosition) {
      await handlePositionAction(newPosition, currentPlayer);
    }

    handleNextTurn(diceResult);
  },
}));

export default usePlayStore;
