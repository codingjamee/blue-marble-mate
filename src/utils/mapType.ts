import { BuildingType } from '../stores/landType';

export type BoardPosition = 'top' | 'right' | 'bottom' | 'left';

type RentPriceType =
  | { land: number; villa1: number; villa2: number; building: number; hotel: number }
  | 0;

type PriceType = { land: number; villa: number; building: number; hotel: number } | 0;

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

// Base interface for all squares
interface BaseSquare {
  id: number;
  name: string;
  flag: string;
  owner: string | null;
  buildings: BuildingType[];
}

// City specific data
export interface CitySquare extends BaseSquare {
  type: 'city';
  country: string;
  price: PriceType;
  rentPrice: RentPriceType;
}

// Island specific data
export interface IslandSquare extends BaseSquare {
  type: 'island';
  country: '무인도';
}

// Fund specific data
export interface FundSquare extends BaseSquare {
  type: 'fund';
  country: string;
}

// Start specific data
export interface StartSquare extends BaseSquare {
  type: 'start';
  country: string;
}

// Space specific data
export interface SpaceSquare extends BaseSquare {
  type: 'space';
  country: string;
}

// Golden key specific data
export interface GoldenKeySquare extends Omit<BaseSquare, 'owner' | 'buildings'> {
  type: 'goldenKey';
  name: '황금열쇠';
  flag: '🔑';
}

// Union type for a single square
export type SquareType =
  | CitySquare
  | IslandSquare
  | FundSquare
  | StartSquare
  | SpaceSquare
  | GoldenKeySquare;

export interface GoldenKeyType {
  id: number;
  type: 'goldenKey';
  name: '황금열쇠';
  flag: '🔑';
}
export type BoardData = Record<BoardPosition, SquareType[]>;
