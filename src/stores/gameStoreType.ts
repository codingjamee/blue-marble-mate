import dayjs from 'dayjs';
import { createStore, UseStore } from 'idb-keyval';
import { LandType } from '../utils/mapType';
import { PlayerNamesType } from './playerType';

export interface GameState {
  gameName: string;
  isOnline: boolean;
  gameState: boolean;
  players: PlayerNamesType[];
  createdAt: dayjs.Dayjs | null;
  round: number;
  gameList: string[]; // 모든 게임 이름 목록;
  lands: LandType[];
  currentStore: ReturnType<typeof createStore> | null;
  updateGameState: (state: boolean) => void;
  setGameName: (name: string) => Promise<void>;
  updateRandomGameName: () => Promise<void>;
  updateEmptyGameName: () => Promise<void>;
  startGame: (value?: boolean) => Promise<void>;
  loadGame: () => Promise<GameData | null | undefined>;
  endGame: (value?: boolean) => void;
  resetGame: () => void;
  deleteGame: (name: string) => Promise<void>;
  createNewStore: (name: string) => Promise<UseStore>;
  syncPlayers: (players: PlayerNamesType[]) => void;
  syncLands: (lands: LandType[]) => void;
}
export interface GameData {
  gameName: string;
  players: PlayerNamesType[];
  lands: LandType[];
  createdAt: dayjs.Dayjs;
  gameState: boolean;
}
