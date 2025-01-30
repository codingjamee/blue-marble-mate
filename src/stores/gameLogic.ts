import { GameData, GameState } from './gameStore';
import dayjs from 'dayjs';
import {
  createStore,
  get as getFromDB,
  set as setToDB,
  UseStore,
  del as delFromDB,
} from 'idb-keyval';
import { PlayerNamesType, PlayerState } from './playerStore';
import { StoreApi } from 'zustand';

const connectionManager = {
  connections: new Map<string, UseStore>(),

  async getConnection(name: string): Promise<UseStore> {
    if (!this.connections.has(name)) {
      const store = createStore(`${name}-db`, `${name}-store`);
      this.connections.set(name, store);
    }
    return this.connections.get(name)!;
  },

  async closeConnection(name: string) {
    this.connections.delete(name);
  },
};

const startGameService = async (
  setState: (state: Partial<GameState>) => void,
  getState: () => GameState,
  options: {
    gameName: string;
    playerStore: StoreApi<PlayerState>;
    mainStore: any;
  },
) => {
  const { gameName } = getState();
  const store = await connectionManager.getConnection(gameName);
  const players = options.playerStore.getState().playerInfos;

  const gameData: GameData = {
    gameName,
    players,
    createdAt: dayjs(),
    gameState: false,
  };

  try {
    await setToDB(gameName, gameData, store);
    await setToDB('currentGame', gameName, options.mainStore);

    setState({
      ...gameData,
      createdAt: dayjs(gameData.createdAt),
    });
  } catch (error) {
    console.error('Failed to save game data:', error);
  }
};

const saveToDB = async (get: () => GameState, players: PlayerNamesType[]) => {
  const state = get();
  const gameName = get().gameName;
  const store = await connectionManager.getConnection(gameName);

  const gameData = {
    gameName: state.gameName,
    players,
    gameState: state.gameState,
    createdAt: state.createdAt || dayjs(),
    updatedAt: new Date(),
  };

  await setToDB(gameName, gameData, store);
};

const loadGameService = async (
  setState: (state: Partial<GameState>) => void,
  getState: () => GameState,
  options: {
    mainStore: any;
  },
) => {
  try {
    const lastGameName = await getFromDB<string>('currentGame', options.mainStore);
    if (lastGameName) {
      const store = await connectionManager.getConnection(lastGameName);
      const gameData = await getFromDB<GameData>(lastGameName, store);

      if (gameData) {
        setState({
          ...gameData,
          createdAt: dayjs(gameData.createdAt),
          currentStore: store,
          gameName: lastGameName,
        });
      }
      return gameData;
    }
  } catch (error) {
    if (getState().gameName) {
      await connectionManager.closeConnection(getState().gameName);
    }
    return null;
  }
};

const customStorage = (mainStore: UseStore) => ({
  getItem: async (name: IDBValidKey) => {
    try {
      const data = await getFromDB(name, mainStore);
      return data || null;
    } catch {
      return null;
    }
  },
  setItem: async (name: IDBValidKey, value: any) => {
    try {
      await setToDB(name, value, mainStore);
    } catch (err) {
      console.error('Error saving to IndexedDB:', err);
    }
  },
  removeItem: async (name: IDBValidKey) => {
    try {
      await delFromDB(name, mainStore);
    } catch (err) {
      console.error('Error removing from IndexedDB:', err);
    }
  },
});

export { startGameService, loadGameService, customStorage, saveToDB };
