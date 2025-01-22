import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { ColorOption, colorOptions } from '../constants/colors';
import { generateRandomPlayerName } from '../utils/playerNaming';

export interface PlayerNamesType {
  id: string;
  name: string;
  color: ColorOption['value'];
}

interface PlayerState {
  playerNumber: number;
  playerNames: PlayerNamesType[];
  setPlayerNumber: (number: PlayerState['playerNumber']) => void;
  setPlayerInit: (number: PlayerState['playerNumber']) => void;
  updatePlayerName: (index: number, state: PlayerNamesType['name']) => void;
  updateRandomPlayerName: (playerId: PlayerNamesType['id']) => void;
  updatePlayerColor: (index: PlayerNamesType['id'], state: PlayerNamesType['color']) => void;
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
    set((state: PlayerState) => {
      const restPlayer = number - state.playerNames.length;
      if (restPlayer <= 0) {
        const slicedState = {
          ...state,
          playerNames: state.playerNames.slice(0, number),
        };
        return slicedState;
      }
      const newToAddedInit = Array(restPlayer)
        .fill(null)
        .map((_: null, index: number) => ({
          id: uuid(),
          name: '',
          color: colorOptions[state.playerNames.length + index].value,
        }));
      console.log(newToAddedInit);
      return { ...state, playerNames: [...state.playerNames, ...newToAddedInit] };
    }),
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
      const updatePlayers = structuredClone(state.playerNames);
      const newPlayers = updatePlayers.map((player) =>
        player.id === playerId ? { ...player, name: generateRandomPlayerName() } : player,
      );
      return { ...state, playerNames: newPlayers };
    }),
}));

export default playerStore;
