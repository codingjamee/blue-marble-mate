import { GameData, GameState } from './gameStore';
import dayjs from 'dayjs';
import {
  createStore,
  get as getFromDB,
  set as setToDB,
  UseStore,
  del as delFromDB,
} from 'idb-keyval';

const startGameService = async (
  setState: (state: Partial<GameState>) => void,
  getState: () => GameState,
  options: {
    gameName: string;
    playerStore: any;
    mainStore: any;
  },
) => {
  const { gameName } = getState();
  const newStore = createStore(`${gameName}-db`, `${gameName}-store`);
  const players = options.playerStore.getState().playerNames;

  const gameData: GameData = {
    gameName,
    players,
    createdAt: dayjs(),
    gameState: true,
  };

  try {
    await setToDB(gameName, gameData, newStore);
    await setToDB('currentGame', gameName, options.mainStore);

    setState({
      ...gameData,
      createdAt: dayjs(gameData.createdAt),
    });
  } catch (error) {
    console.error('Failed to save game data:', error);
  }
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
      const store = await getState().createNewStore(lastGameName);
      const gameData = await getFromDB<GameData>(lastGameName, store);
      console.log(gameData);

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
    console.error('Failed to load game:', error);
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
      await delFromDB(name);
    } catch (err) {
      console.error('Error removing from IndexedDB:', err);
    }
  },
});

export { startGameService, loadGameService, customStorage };
