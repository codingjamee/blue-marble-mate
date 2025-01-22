import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { ColorOption, colorOptions } from '../constants/colors';
import { generateRandomPlayerName } from '../utils/playerNaming';
import { getRandomElement } from '../utils/utils';
import { getAvailableColors, getPlayerInitialize } from './playerLogic';

export interface PlayerNamesType {
  id: string;
  name: string;
  color: ColorOption['value'];
}

export interface PlayerState {
  playerNumber: number;
  playerNames: PlayerNamesType[];
  setPlayerNumber: (number: PlayerState['playerNumber']) => void;
  setPlayerInit: (number: PlayerState['playerNumber']) => void;
  updatePlayerName: (index: number, state: PlayerNamesType['name']) => void;
  updateRandomPlayerName: (playerId: PlayerNamesType['id']) => void;
  updatePlayerColor: (index: PlayerNamesType['id'], state: PlayerNamesType['color']) => void;
  updateRandomPlayerColor: (playerId: PlayerNamesType['id']) => void;
}

const playerStore = create<PlayerState>((set) => ({
  playerNumber: 2,
  playerNames: Array(2)
    .fill(null)
    .map((_, index) => ({
      id: uuid(),
      name: '',
      color: colorOptions[index].value,
    })),
  setPlayerNumber: (number: PlayerState['playerNumber']) =>
    set(() => ({
      playerNumber: number,
    })),
  setPlayerInit: (number) =>
    set((state: PlayerState) => ({
      ...state,
      playerNames: getPlayerInitialize({ number, state }),
    })),
  updatePlayerName: (index: number, updates: PlayerNamesType['name']) =>
    set((state) => ({
      playerNames: state.playerNames.map((player, i) =>
        i === index ? { ...player, name: updates } : player,
      ),
    })),
  updatePlayerColor: (playerId: PlayerNamesType['id'], updates: PlayerNamesType['color']) =>
    set((state) => ({
      playerNames: state.playerNames.map((player) =>
        playerId === player.id ? { ...player, color: updates } : player,
      ),
    })),
  updateRandomPlayerName: (playerId: PlayerNamesType['id']) =>
    set((state) => {
      const newPlayers = state.playerNames.map((player) =>
        player.id === playerId ? { ...player, name: generateRandomPlayerName() } : player,
      );
      return { ...state, playerNames: newPlayers };
    }),
  updateRandomPlayerColor: (playerId) =>
    set((state) => {
      const selectedColor = state.playerNames.map((p) => p.color);
      const availableColor = getAvailableColors(selectedColor);

      const stateWithNewColor = state.playerNames.map((player) =>
        player.id === playerId ? { ...player, color: getRandomElement(availableColor) } : player,
      );

      return { ...state, playerNames: stateWithNewColor };
    }),
}));

export default playerStore;
