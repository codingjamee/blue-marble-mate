import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { ColorOption } from '../constants/colors';
import { generateRandomGameName } from '../utils/sessionNaming';

export interface PlayerNamesType {
  id: string;
  name: string;
  color: ColorOption['value'];
}

export type GameNameType = string;

interface GameState {
  gameName: GameNameType;
  setGameName: (name: string) => void;
  updateRandomGameName: () => void;
  updatEmptyGameName: () => void;
}

const gameStore = create<GameState>((set) => ({
  gameName: '',
  setGameName: (name) => set((state) => ({ ...state, gameName: name })),
  updateRandomGameName: () => set((state) => ({ ...state, gameName: generateRandomGameName() })),
  updatEmptyGameName: () =>
    set((state) => ({
      ...state,
      gameName: state.gameName.length === 0 ? generateRandomGameName() : state.gameName,
    })),
}));

export default gameStore;
