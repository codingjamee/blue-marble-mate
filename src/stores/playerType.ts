import { ColorOption } from '../constants/colors';
import { BoardPosition, LandType } from '../utils/mapType';
import { GameState } from './gameStoreType';

export interface PlayerNamesType {
  id: string;
  name: string;
  property?: {
    propertyId: string;
    name: string;
    buildings: {
      villa: boolean;
      building: boolean;
      hotel: boolean;
    }[];
  }[];
  luckyKeys?: {
    name: string;
  }[];
  cash: number;
  position: {
    id: number;
    name: string;
    position: LandType;
  };
  isInIsland: boolean;
  islandTurnLeft: number;
  playerColor: ColorOption['value'];
  isCurrentTurn: boolean;
  isDouble: boolean;
  doubleTurnLeft: number;
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
  processPayment: (
    id: PlayerNamesType['id'],
    amount: number,
    toId?: PlayerNamesType['id'],
  ) => Promise<boolean>;
  updateIslandTurn: (id: PlayerNamesType['id'], value: number) => void;
}
