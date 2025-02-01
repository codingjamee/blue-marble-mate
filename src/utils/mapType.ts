import { BuildingType } from '../stores/landType';

export type BoardPosition = 'top' | 'right' | 'bottom' | 'left';

export type BuildingRentType = 'land' | 'villa1' | 'villa2' | 'building' | 'hotel';

export type RentPriceType = Record<BuildingRentType, number>;

export type PriceType = { land: number; villa: number; building: number; hotel: number };

export interface NationType {
  id: number;
  name: string;
  type: 'city' | 'goldenKey' | 'fund' | 'start' | 'space' | 'island';
  price: PriceType;
  rentPrice: RentPriceType;
  country: string;
  flag: string;
  owner: string | null;
  buildings: RentPriceType[];
}

// Base interface for all lands
interface BaseLandType {
  id: number;
  name: string;
  flag: string;
  owner: string | null;
  buildings: BuildingRentType[];
}

// City specific data
export interface CityLandType extends BaseLandType {
  type: 'city';
  country: string;
  price: PriceType;
  rentPrice: RentPriceType;
}

// Island specific data
export interface IslandType extends BaseLandType {
  type: 'island';
  country: '무인도';
}

// Fund specific data
export interface FundType extends Omit<BaseLandType, 'owner' | 'buildings' | 'country'> {
  type: 'fund';
}

// Start specific data
export interface StartType extends Omit<BaseLandType, 'owner' | 'buildings' | 'country'> {
  type: 'start';
  country: string;
}

// Space specific data
export interface SpaceType extends BaseLandType {
  type: 'space';
  price: PriceType;
  rentPrice: RentPriceType;
}

// Golden key specific data
export interface GoldenKeyType extends Omit<BaseLandType, 'owner' | 'buildings'> {
  type: 'goldenKey';
  name: '황금열쇠';
  flag: '🔑';
}

// Union type for a single land
export type LandType = CityLandType | IslandType | FundType | StartType | SpaceType | GoldenKeyType;

export interface GoldenKeyType {
  id: number;
  type: 'goldenKey';
  name: '황금열쇠';
  flag: '🔑';
}
export type BoardData = Record<BoardPosition, LandType[]>;
