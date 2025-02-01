import { PriceType, RentPriceType, LandType, NationType, BuildingRentType } from '../utils/mapType';
import { GameData } from './gameStoreType';
import { PlayerNamesType } from './playerType';

export interface BuildingType {
  villa1: boolean;
  villa2: boolean;
  building: boolean;
  hotel: boolean;
}

export interface LandState {
  lands: Array<LandType> & Record<number, LandType>;
  currentGameName: string;

  // Getters
  getLandInfo: (position: number) => LandType | null;
  getOwnerLands: (ownerId: string) => LandType[];
  getCityRentPrice: (landId: number) => number;
  getLandOwnerAndRent: (
    landId: LandType['id'],
    ownerId: PlayerNamesType['id'],
  ) => {
    isCurrentPlayerOwner: boolean;
    hasOwner: boolean;
    ownerId: NationType['owner'];
    rentPrice: number;
  };

  // Setters
  updateLandOwner: (position: number, owner: NationType['owner']) => void;
  updateBuildings: (position: number, buildings: BuildingRentType[]) => void;
  updateNestedLandInfo: (position: number, path: string[], value: any) => void;

  // Initialization & Loading
  initializeLands: () => void;
  loadGameLands: () => Promise<GameData | null | undefined>;
}
