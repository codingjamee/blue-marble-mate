import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { ColorOption, colorOptions } from '../constants/colors';

export interface PlayerNamesType {
  id: string;
  name: string;
  color: ColorOption['value'];
}

interface PlayerState {
  gameName: string;
  playerNumber: number;
  playerNames: PlayerNamesType[];
  setPlayerNumber: (number: PlayerState['playerNumber']) => void;
  setPlayerInit: (number: PlayerState['playerNumber']) => void;
  updatePlayerName: (index: number, state: PlayerNamesType['name']) => void;
  updatePlayerColor: (index: PlayerNamesType['id'], state: PlayerNamesType['color']) => void;
  setGameName: (name: string) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  playerNumber: 2,
  playerNames: Array(2)
    .fill(null)
    .map((_, index) => ({
      id: uuid(),
      name: '',
      color: colorOptions[index].value,
    })),
  gameName: '',
  setPlayerNumber: (number: PlayerState['playerNumber']) =>
    set(() => ({
      playerNumber: number,
    })),
  setPlayerInit: (number) =>
    set((state: PlayerState) => {
      const restPlayer = number - state.playerNames.length;
      const newToAddedInit = Array(restPlayer).fill((_: null, index: number) => ({
        id: uuid(),
        name: '',
        color: colorOptions[index].value,
      }));
      return { ...state, playerNames: [...state.playerNames, ...newToAddedInit] };
    }),
  updatePlayerName: (index: number, updates: PlayerNamesType['name']) =>
    set((state) => ({
      playerNames: state.playerNames.map((player, i) =>
        i === index ? { ...player, name: updates } : player,
      ),
    })),
  setGameName: (name) => set((state) => ({ ...state, gameName: name })),
  updatePlayerColor: (playerId: PlayerNamesType['id'], updates: PlayerNamesType['color']) =>
    set((state) => ({
      playerNames: state.playerNames.map((player) =>
        playerId === player.id ? { ...player, color: updates } : player,
      ),
    })),
}));

export default usePlayerStore;
