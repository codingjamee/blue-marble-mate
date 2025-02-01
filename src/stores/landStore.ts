import { create } from 'zustand';
import gameStore, { mainStore } from './gameStore';
import { updateNestedValue } from '../utils/utils';
import { loadGameLandsService } from './landLogic';
import { POSITION_DATA } from '../utils/mapInfo';
import { LandState } from './landType';
import { CityLandType, LandType } from '../utils/mapType';

function isThisLand(land: LandType): land is CityLandType {
  return 'owner' in land;
}

const landStore = create<LandState>((set, get) => ({
  lands: structuredClone(POSITION_DATA),
  currentGameName: '',

  getLandInfo: (position) => {
    return get().lands[position] || null;
  },

  getOwnerLands: (ownerId) => {
    return Object.values(get().lands)
      .filter(isThisLand)
      .filter((land) => land.owner && land.owner === ownerId);
  },

  checkLandOwner: (landId, playerId) => {
    const land = get().lands[landId];

    if (!isThisLand(land)) {
      throw new Error('This land is not a land');
    }
    return {
      isCurrentPlayerOwner: land.owner === playerId,
      hasOwner: land.owner !== null,
      ownerId: land.owner,
      price: land.price,
      rentPrice: land.rentPrice,
    };
  },

  updateLandOwner: (position, owner) => {
    set((state) => {
      const updatedLands = {
        ...state.lands,
        [position]: {
          ...state.lands[position],
          owner,
        },
      };

      gameStore.getState().syncLands(updatedLands);

      return { lands: updatedLands };
    });
  },

  updateBuildings: (position, buildings) => {
    set((state) => {
      const updatedLands = {
        ...state.lands,
        [position]: {
          ...state.lands[position],
          buildings,
        },
      };

      gameStore.getState().syncLands(updatedLands);

      return { lands: updatedLands };
    });
  },

  updateNestedLandInfo: (position, path, value) => {
    set((state) => {
      const updatedLand = updateNestedValue(state.lands[position], path, value);
      const updatedLands = {
        ...state.lands,
        [position]: updatedLand,
      };

      gameStore.getState().syncLands(updatedLands);

      return { lands: updatedLands };
    });
  },

  initializeLands: () => {
    const initialLands = structuredClone(POSITION_DATA);

    set({ lands: initialLands });
    gameStore.getState().syncLands(initialLands);
  },

  loadGameLands: async () => {
    const result = await loadGameLandsService(set, gameStore.getState().createNewStore, {
      mainStore,
    });
    return result;
  },
}));

// 초기 로드
// landStore.getState().loadGameLands();

export default landStore;
