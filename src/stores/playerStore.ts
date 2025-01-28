import { create } from 'zustand';
import { ColorOption, colorOptions } from '../constants/colors';
import { generateRandomPlayerName } from '../utils/playerNaming';
import {
  getPlayerInitialize,
  getRandomColors,
  getUpdatedPlayerInit,
  loadGamePlayersService,
} from './playerLogic';
import gameStore, { GameState, mainStore } from './gameStore';
import { updateNestedValue } from '../utils/utils';

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
    name: string;
    number: number;
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
  // up9datePlayerInfo: (id: PlayerNamesType['id'] value: Pick<PlayerNamesType>) => void;
  updateRandomPlayerColor: (playerId: PlayerNamesType['id']) => void;
  updatePlayer: (id: string, path: string[], value: any) => void;
  getNowTurnId: () => string;
  startTurn: () => void;
  loadGamePlayers: () => Promise<GameState | null | undefined>;
  // setState: (fn: any) => void;
  // syncToGame: (gameStore: StoreApi<GameState>) => Promise<void>;
}

const playerStore = create<PlayerState>((set, get) => ({
  playerNumber: 2,
  playerInfos: getPlayerInitialize({ number: 2 }),
  setPlayerNumber: (number: PlayerState['playerNumber']) => set(() => ({ playerNumber: number })),
  setPlayerInit: () =>
    set((state) => ({
      playerInfos: getPlayerInitialize({ number: 2, state: state }),
    })),
  updatePlayerNumber: (number) =>
    set((state: PlayerState) => ({
      ...state,
      playerInfos: getUpdatedPlayerInit({ number, state }),
    })),
  updatePlayerName: (index: number, updates: PlayerNamesType['name']) =>
    set((state) => ({
      playerInfos: state.playerInfos.map((player, i) =>
        i === index ? { ...player, name: updates } : player,
      ),
    })),
  updatePlayerColor: (playerId: PlayerNamesType['id'], updates: PlayerNamesType['playerColor']) =>
    set((state) => ({
      playerInfos: state.playerInfos.map((player) =>
        playerId === player.id ? { ...player, color: updates } : player,
      ),
    })),
  updateRandomPlayerName: (playerId: PlayerNamesType['id']) =>
    set((state) => {
      const newPlayers = state.playerInfos.map((player) =>
        player.id === playerId ? { ...player, name: generateRandomPlayerName() } : player,
      );
      return { ...state, playerInfos: newPlayers };
    }),
  updateEmptyName: () =>
    set((state) => {
      const newPlayers = state.playerInfos.map((p) =>
        p.name.length === 0 ? { ...p, name: generateRandomPlayerName() } : p,
      );
      return { ...state, playerInfos: newPlayers };
    }),
  updateRandomPlayerColor: (playerId) =>
    set((state) => {
      const randomColors = getRandomColors({ number: 1, state });

      const stateWithNewColor = state.playerInfos.map((player) =>
        player.id === playerId
          ? { ...player, playerColor: randomColors?.[0] ?? colorOptions[0].value }
          : player,
      );

      return { ...state, playerInfos: stateWithNewColor };
    }),

  updatePlayer: (id, path, value) => {
    set((state) => {
      const updatedPlayerInfos = state.playerInfos.map((player) =>
        player.id === id ? updateNestedValue(player, path, value) : player,
      );

      gameStore.getState().syncPlayers(updatedPlayerInfos);

      return {
        ...state,
        playerInfos: updatedPlayerInfos,
      };
    });
  },

  startTurn: () => {
    const firstPlayer = get().playerInfos[0];
    get().updatePlayer(firstPlayer.id, ['isCurrentTurn'], true);
  },

  nextTurn: () => {
    const currentPlayer = get().playerInfos.find((player) => player.isCurrentTurn);
    if (!currentPlayer) return;
    get().updatePlayer(currentPlayer?.id, ['isCurrentTurn'], false);
  },

  getNowTurnId: () => {
    const currentPlayer = get().playerInfos.find((player) => player.isCurrentTurn);
    return currentPlayer?.id ?? get().playerInfos[0].id;
  },

  loadGamePlayers: async () => {
    const result = await loadGamePlayersService(set, gameStore.getState().createNewStore, {
      mainStore,
    });
    return result;
  },
}));

playerStore.getState().loadGamePlayers();

export default playerStore;
