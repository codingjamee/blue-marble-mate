import { RollResult } from '../pages/game/hooks/useRollDice';
import { NationType, LandType, BuildingRentType } from '../utils/mapType';
import { PlayerNamesType } from './playerType';

// import { RollResult } from '../types/dice';
// import { handleGoldenKey } from '../utils/goldenKeyLogic';
export type ActionType = 'BUY' | 'BUILD' | 'PAY_RENT' | 'SELL' | 'SKIP' | 'INISLAND' | 'GOLDEN_KEY';
export interface PlayState {
  // 게임 진행 상태
  gamePhase: 'ROLL' | 'MOVE' | 'ACTION' | 'END_TURN' | 'INISLAND';
  isRolling: boolean;
  dices: RollResult | null;
  isDouble: boolean;
  pendingAction: {
    type: ActionType;
    landId: LandType['id'];
    price: number;
    options?: { owner?: PlayerNamesType['id']; buildings?: BuildingRentType[] };
  } | null;

  // 주사위 관련 액션
  setGamePhase: (phase: PlayState['gamePhase']) => void;
  setDices: (dices: RollResult) => void;
  setPendingAction: (pendingAction: PlayState['pendingAction']) => void;
  // handleRolling: () => Promise<RollResult>;
  // 이동 관련 액션
  handleMoving: (diceResult: RollResult) => Promise<LandType | null>;
  handlePositionAction: (position: LandType, currentPlayer: PlayerNamesType) => Promise<void>;

  // 턴 관련 액션
  handleTurn: () => Promise<void>;
  handleUserAction: (actionType: ActionType) => Promise<void>;
  handleNextTurn: () => void;
}
