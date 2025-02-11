import { create } from 'zustand';
import gameStore, { mainStore } from './gameStore';
import { updateNestedValue } from '../utils/utils';
import { loadGameLandsService } from './landLogic';
import { availableBuildings, POSITION_DATA } from '../utils/mapInfo';
import { LandState } from './landType';
import { BuildingRentType, CityLandType, FundType, LandType } from '../utils/mapType';
import playerStore from './playerStore';

export function isThisOwnableCity(land: LandType | null): land is CityLandType {
  if (!land || !('owner' in land)) return false;

  return 'buildings' in land;
}

export function hereIsFund(land: LandType): land is FundType {
  console.log('here is fund', land, land.type === 'fund' || land.type === 'fundRaise');
  return land.type === 'fund' || land.type === 'fundRaise';
}

function isThereOwner(landId: number | null): landId is number {
  return landId !== null;
}

const landStore = create<LandState>((set, get) => ({
  lands: structuredClone(POSITION_DATA),
  currentGameName: '',

  getLandInfo: (position) => {
    if (!get().lands[position]) console.error('position is not validate');
    return get().lands[position];
  },

  getOwnerLands: (ownerId) => {
    return Object.values(get().lands)
      .filter(isThisOwnableCity)
      .filter((land) => land.owner && land.owner === ownerId);
  },

  getCityRentPrice: (landId) => {
    const land = get().lands[landId];
    if (!isThereOwner(landId)) {
      // console.log('3. Owner check failed');
      console.log("This land dosen't have land lord");
      return;
    }

    if (!isThisOwnableCity(land)) {
      // console.log('4. City check failed');
      console.log('rent price cannot be calculated');
      return;
    }

    // console.log('5. Passed all checks');
    const calculateRentPrice = () => {
      if (land.buildings.length === 0) return land.price.land;
      const rentPrice = land.buildings.reduce((rentPrice: number, building: BuildingRentType) => {
        const price = land.rentPrice[building];
        return (rentPrice += price);
      }, 0);

      return rentPrice;
    };

    return calculateRentPrice();
  },

  getLandOwnerAndRent: (landId, playerId) => {
    const land = get().lands[landId];
    const getCityRentPrice = get().getCityRentPrice;

    if (!isThisOwnableCity(land)) {
      console.log('Here is not a land', land);
      return {
        isCurrentPlayerOwner: undefined,
        hasOwner: undefined,
        ownerId: null,
        ownerName: null,
        rentPrice: 0,
      };
    }
    return {
      isCurrentPlayerOwner: land.owner === playerId,
      hasOwner: land.owner !== null,
      ownerId: land.owner,
      ownerName: land.owner ? playerStore.getState().getNameById(land.owner) : null,
      rentPrice: getCityRentPrice(landId) || 0,
    };
  },

  getAvailableBuildings: (landId) => {
    const landInfo = get().lands[landId];

    if (!isThisOwnableCity(landInfo)) {
      console.log('This place is not ownable');
      return [];
    }
    const availableBuilding = availableBuildings.filter(
      (building) => !landInfo.buildings.includes(building),
    );

    return availableBuilding;
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

  updateBuildings: (position, building) => {
    set((state) => {
      const updatedLands = {
        ...state.lands,
        [position]: {
          ...state.lands[position],
          ...(isThisOwnableCity(state.lands[position]) && {
            buildings: state.lands[position].buildings.concat(building),
          }),
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

  fundRaising: (position, fundPrice) => {
    console.log('fund raising is called 👼🏻👼🏻👼🏻👼🏻👼🏻');
    if (!hereIsFund(position)) return console.log('You cannot fund raise from here');
    //모금

    set((state) => {
      const updatedLands = state.lands.map((land) => {
        if (hereIsFund(land) && 'fund' in land) {
          return {
            ...land,
            fund: land.fund + fundPrice,
          } as FundType;
        }
        return land;
      });

      console.log('fund raising updatedLands👼🏻👼🏻👼🏻👼🏻👼🏻', updatedLands);
      gameStore.getState().syncLands(updatedLands);

      return { lands: updatedLands };
    });
  },

  initializeLands: () => {
    console.log('initializeLands is called');
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
