import { ColorOption } from '../constants/colors';
import { BuildingRentType, LandType, NationType } from '../utils/mapType';
import { GameState } from './gameStoreType';

type BuildingKey = Exclude<BuildingRentType, 'land'>;

export interface PlayerNamesType {
  id: string;
  name: string;
  property?: {
    propertyId: number;
    name: string;
    buildings: Record<BuildingKey, boolean>;
  }[];
  luckyKeys?: {
    name: string;
  }[];
  cash: number;
  position: LandType;
  isInIsland: boolean;
  islandTurnLeft: number;
  playerColor: ColorOption['value'];
  isCurrentTurn: boolean;
  isDouble: boolean;
  doubleTurnLeft: number;
  canSkipTurn: boolean;
}

export interface PlayerState {
  playerNumber: number;
  playerInfos: PlayerNamesType[];
  setPlayerNumber: (number: PlayerState['playerNumber']) => void;
  setPlayerInit: () => void;
  updatePlayerNumber: (number: PlayerState['playerNumber']) => void;
  updatePlayerName: (index: number, state: PlayerNamesType['name']) => void;
  updateRandomPlayerName: (playerId: PlayerNamesType['id']) => void;
  updateEmptyName: () => void;
  updatePlayerColor: (index: PlayerNamesType['id'], state: PlayerNamesType['playerColor']) => void;
  updateRandomPlayerColor: (playerId: PlayerNamesType['id']) => void;
  updateNestedPlayerInfo: (id: string, path: string[], value: any) => void;
  getNowTurnId: () => string;
  getNowTurn: () => PlayerNamesType;
  startTurn: () => void;
  nextTurn: (currentPlayer: PlayerNamesType) => void;
  updateDouble: (id: PlayerNamesType['id'], isDouble: boolean, turnLeft: number) => void;
  loadGamePlayers: () => Promise<GameState | null | undefined>;
  updatePlayerPosition: (
    id: PlayerNamesType['id'],
    position: PlayerNamesType['position']['id'],
  ) => void;
  getPlayerInfo: (id: PlayerNamesType['id']) => PlayerNamesType;
  getNameById: (id: PlayerNamesType['id']) => PlayerNamesType['name'];
  processPayment: (
    amount: number,
    fromId?: PlayerNamesType['id'],
    toId?: PlayerNamesType['id'],
  ) => Promise<boolean>;
  updateIslandTurn: (id: PlayerNamesType['id'], value: number) => void;
  updateFirstIslandState: (id: PlayerNamesType['id']) => void;
  updateLandOwner: (landId: NationType['id'], playerId: PlayerNamesType['id']) => void;
  constructBuilding: (
    landId: NationType['id'],
    playerId: PlayerNamesType['id'],
    buildingType: Exclude<BuildingRentType, 'land'>,
  ) => void;
  updateSkip: (playerId: PlayerNamesType['id'], value: boolean) => void;
}
