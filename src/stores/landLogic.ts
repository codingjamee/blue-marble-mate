import { get as getFromDB } from 'idb-keyval';
import { UseStore } from 'idb-keyval';
import { GameData } from './gameStore';
import { SetStateFunction } from './playerLogic';
import { LandState } from './landType';

const loadGameLandsService = async (
  setState: SetStateFunction<LandState>,
  createNewStore: (name: string) => Promise<UseStore>,
  options: {
    mainStore: UseStore;
  },
) => {
  try {
    const lastGameName = await getFromDB<string>('currentGame', options.mainStore);

    if (lastGameName) {
      const store = await createNewStore(lastGameName);
      const gameData = await getFromDB<GameData>(lastGameName, store);

      if (gameData) {
        setState((state) => ({
          ...state,
          lands: gameData.lands,
          currentGameName: gameData.gameName,
        }));
      }
      return gameData;
    }
  } catch (error) {
    console.error('Failed to load lands:', error);
    return null;
  }
};

export { loadGameLandsService };
