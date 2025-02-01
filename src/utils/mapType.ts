import { BuildingType } from '../stores/landType';

export type BoardPosition = 'top' | 'right' | 'bottom' | 'left';

export type RentPriceType =
  | { land: number; villa1: number; villa2: number; building: number; hotel: number }
  | 0;

export type PriceType = { land: number; villa: number; building: number; hotel: number } | 0;

export interface NationType {
  id: number;
  name: string;
  type: 'city' | 'goldenKey' | 'fund' | 'start' | 'space' | 'island';
  price: PriceType;
  rentPrice: RentPriceType;
  country: string;
  flag: string;
  owner: string | null;
  buildings: BuildingType[];
}

// Base interface for all lands
interface BaseLandType {
  id: number;
  name: string;
  flag: string;
  owner: string | null;
  buildings: BuildingType[];
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
export interface FundType extends BaseLandType {
  type: 'fund';
  country: string;
}

// Start specific data
export interface StartType extends BaseLandType {
  type: 'start';
  country: string;
}

// Space specific data
export interface SpaceType extends BaseLandType {
  type: 'space';
  country: string;
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
