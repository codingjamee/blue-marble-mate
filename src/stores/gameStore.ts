import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { generateRandomGameName } from '../utils/sessionNaming';

export type GameNameType = string;

interface GameState {
  gameName: GameNameType;
  setGameName: (name: string) => void;
  updateRandomGameName: () => void;
  updatEmptyGameName: () => void;
  isOnline: boolean;
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
  isOnline: navigator.onLine,
}));

window.addEventListener('online', () => gameStore.setState({ isOnline: true }));
window.addEventListener('offline', () => gameStore.setState({ isOnline: false }));

export default gameStore;
