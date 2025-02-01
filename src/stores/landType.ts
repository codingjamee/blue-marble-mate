import { PriceType, RentPriceType, LandType } from '../utils/mapType';
import { GameData } from './gameStore';
import { PlayerNamesType } from './playerType';

export interface BuildingType {
  villa: boolean;
  building: boolean;
  hotel: boolean;
}

export interface LandState {
  lands: LandType[];
  currentGameName: string;

  // Getters
  getLandInfo: (position: number) => LandType | null;
  getOwnerLands: (ownerId: string) => LandType[];
  checkLandOwner: (
    landId: LandType['id'],
    ownerId: PlayerNamesType['id'],
  ) => {
    isCurrentPlayerOwner: boolean;
    hasOwner: boolean;
    ownerId: PlayerNamesType['id'] | null;
    price: PriceType;
    rentPrice: RentPriceType;
  };

  // Setters
  updateLandOwner: (position: number, owner: string | null) => void;
  updateBuildings: (position: number, buildings: BuildingType[]) => void;
  updateNestedLandInfo: (position: number, path: string[], value: any) => void;

  // Initialization & Loading
  initializeLands: () => void;
  loadGameLands: () => Promise<GameData | null | undefined>;
}
