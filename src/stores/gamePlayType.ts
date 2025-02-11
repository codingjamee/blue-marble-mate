import { RollResult } from '../pages/game/hooks/useRollDice';
import { LandType, BuildingRentType } from '../utils/mapType';
import { PlayerNamesType } from './playerType';

// import { RollResult } from '../types/dice';
// import { handleGoldenKey } from '../utils/goldenKeyLogic';
export type ActionType =
  | 'BUY'
  | 'BUILD'
  | 'PAY_RENT'
  | 'SELL'
  | 'SKIP'
  | 'INISLAND'
  | 'GOLDEN_KEY'
  | 'FUND_RECEIVE'
  | 'FUND_RAISE';
type pendingOptionType = { owner: PlayerNamesType['id'] | null; buildings?: BuildingRentType[] };
export interface PlayState {
  // 게임 진행 상태
  gamePhase: 'ROLL' | 'MOVE' | 'ACTION' | 'END_TURN' | 'INISLAND';
  isRolling: boolean;
  dices: RollResult | null;
  isDouble: boolean;
  pendingAction: {
    type: ActionType;
    landId: LandType['id'];
    price?: number;
    options?: pendingOptionType | null;
    fund?: number;
  } | null;
  diceIsRolled: boolean;
  setDiceIsRolled: (value: boolean) => void;
  // 주사위 관련 액션
  setGamePhase: (phase: PlayState['gamePhase']) => void;
  setDices: (dices: RollResult) => void;
  setPendingAction: (pendingAction: PlayState['pendingAction']) => void;
  // handleRolling: () => Promise<RollResult>;
  // 이동 관련 액션
  handleMoving: (diceResult: RollResult) => Promise<LandType | null>;
  handlePendingAction: (position: LandType, currentPlayer: PlayerNamesType) => Promise<void>;

  // 턴 관련 액션
  handleTurn: () => Promise<true | void>;
  handleIslandTurn: () => Promise<true | void>;
  handleUserAction: (
    actionType: ActionType,
    building?: Exclude<BuildingRentType, 'land'>,
  ) => Promise<void>;
  handleNextTurn: () => void;
  validateAndResetDice: () => void;
  handleMovingAndPendingAction: () => Promise<void>;
}
