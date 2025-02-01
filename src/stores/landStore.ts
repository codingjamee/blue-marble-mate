import { create } from 'zustand';
import gameStore, { mainStore } from './gameStore';
import { updateNestedValue } from '../utils/utils';
import { loadGameLandsService } from './landLogic';
import { POSITION_DATA } from '../utils/mapInfo';
import { LandState } from './landType';
import { BuildingRentType, CityLandType, LandType, RentPriceType } from '../utils/mapType';

export function isThisCity(land: LandType): land is CityLandType {
  return 'owner' in land;
}

function isThereOwner(landId: number | null): landId is number {
  return landId !== null;
}

const landStore = create<LandState>((set, get) => ({
  lands: structuredClone(POSITION_DATA),
  currentGameName: '',

  getLandInfo: (position) => {
    return get().lands[position] || null;
  },

  getOwnerLands: (ownerId) => {
    return Object.values(get().lands)
      .filter(isThisCity)
      .filter((land) => land.owner && land.owner === ownerId);
  },

  getCityRentPrice: (landId) => {
    const land = get().lands[landId];
    if (!isThereOwner(landId)) {
      throw new Error("This land dosen't have land lord");
    }
    if (!isThisCity(land)) {
      throw new Error('rent price cannot be calculated');
    }

    const calculateRentPrice = () => {
      if (land.buildings.length === 0) return land.price.land;
      const rentPrice = land.buildings.reduce((rentPrice: number, building: BuildingRentType) => {
        const price = land.rentPrice[building];
        return (rentPrice += price);
      }, 0);

      return rentPrice;
    };

    console.log(land);
    return calculateRentPrice();
  },

  getLandOwnerAndRent: (landId, playerId) => {
    const land = get().lands[landId];
    const getCityRentPrice = get().getCityRentPrice;

    if (!isThisCity(land)) {
      throw new Error('This land is not a land');
    }
    return {
      isCurrentPlayerOwner: land.owner === playerId,
      hasOwner: land.owner !== null,
      ownerId: land.owner,
      rentPrice: getCityRentPrice(landId),
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
    console.log('initialLands??????', initialLands);

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
