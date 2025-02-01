import { create } from 'zustand';
import { colorOptions } from '../constants/colors';
import { generateRandomPlayerName } from '../utils/playerNaming';
import {
  getPlayerInitialize,
  getRandomColors,
  getUpdatedPlayerInit,
  loadGamePlayersService,
} from './playerLogic';
import gameStore, { mainStore } from './gameStore';
import { updateNestedValue } from '../utils/utils';
import { PlayerState, PlayerNamesType } from './playerType';

const playerStore = create<PlayerState>((set, get) => ({
  playerNumber: 2,
  playerInfos: getPlayerInitialize({ number: 2 }),
  //getter
  getNowTurnId: () => {
    const currentPlayer = get().playerInfos.find((player) => player.isCurrentTurn);
    return currentPlayer?.id ?? get().playerInfos[0].id;
  },

  getNowTurn: () => {
    const currentPlayer = get().playerInfos.find((player) => player.isCurrentTurn);
    return currentPlayer ?? get().playerInfos[0];
  },
  getPlayerInfo: (id) => {
    const playerInfo = get().playerInfos.find((player) => player.id === id);
    //없다면 기본값 반환
    if (!playerInfo) return getPlayerInitialize({ number: 1 })[0];
    return playerInfo;
  },

  loadGamePlayers: async () => {
    const result = await loadGamePlayersService(set, gameStore.getState().createNewStore, {
      mainStore,
    });
    return result;
  },

  //setter
  setPlayerNumber: (number: PlayerState['playerNumber']) => set(() => ({ playerNumber: number })),
  setPlayerInit: () =>
    set((state) => ({
      playerInfos: getPlayerInitialize({ number: 2, state: state }),
      playerNumber: 2,
    })),
  updatePlayerNumber: (number) =>
    set((state: PlayerState) => ({
      ...state,
      playerInfos: getUpdatedPlayerInit({ number, state }),
    })),
  updatePlayerName: (index: number, updates: PlayerNamesType['name']) =>
    set((state) => ({
      playerInfos: state.playerInfos.map((player, i) =>
        i === index ? { ...player, name: updates } : player,
      ),
    })),
  updatePlayerColor: (playerId: PlayerNamesType['id'], updates: PlayerNamesType['playerColor']) =>
    set((state) => ({
      playerInfos: state.playerInfos.map((player) =>
        playerId === player.id ? { ...player, color: updates } : player,
      ),
    })),
  updateRandomPlayerName: (playerId: PlayerNamesType['id']) =>
    set((state) => {
      const newPlayers = state.playerInfos.map((player) =>
        player.id === playerId ? { ...player, name: generateRandomPlayerName() } : player,
      );
      return { ...state, playerInfos: newPlayers };
    }),
  updateEmptyName: () =>
    set((state) => {
      const newPlayers = state.playerInfos.map((p) =>
        p.name.length === 0 ? { ...p, name: generateRandomPlayerName() } : p,
      );
      return { ...state, playerInfos: newPlayers };
    }),
  updateRandomPlayerColor: (playerId) =>
    set((state) => {
      const randomColors = getRandomColors({ number: 1, state });

      const stateWithNewColor = state.playerInfos.map((player) =>
        player.id === playerId
          ? { ...player, playerColor: randomColors?.[0] ?? colorOptions[0].value }
          : player,
      );

      return { ...state, playerInfos: stateWithNewColor };
    }),

  updateNestedPlayerInfo: (id, path, value) => {
    set((state) => {
      const updatedPlayerInfos = state.playerInfos.map((player) =>
        player.id === id ? updateNestedValue(player, path, value) : player,
      );

      console.log(updatedPlayerInfos);

      gameStore.getState().syncPlayers(updatedPlayerInfos);

      return {
        ...state,
        playerInfos: updatedPlayerInfos,
      };
    });
  },
  updatePlayerPosition: (nowTurnId, newPosition) => {
    const nowTurnInfo = get().getNowTurn();
    const nextPosition = gameStore.getState().lands.find((data) => {
      return data.id === newPosition;
    });

    if (nextPosition) {
      get().updateNestedPlayerInfo(nowTurnId, ['position'], {
        ...nowTurnInfo.position,
        name: nextPosition.name,
        id: nextPosition.id,
        position: 'position',
      });
    }
  },
  updateDouble: (id, isDouble, turnLeft) => {
    const playerInfo = get().getPlayerInfo(id);

    set((state) => {
      const updatedPlayerInfos = state.playerInfos.map((player) => ({
        ...player,
        isDouble,
        doubleTurnLeft: playerInfo.doubleTurnLeft + turnLeft,
      }));

      gameStore.getState().syncPlayers(updatedPlayerInfos);

      return {
        ...state,
        playerInfos: updatedPlayerInfos,
      };
    });
  },

  processPayment: (id, amount) => {
    const playerInfo = get().getPlayerInfo(id);
    const playerBalance = playerInfo.cash;
    const addedAmount = playerBalance + amount;

    get().updateNestedPlayerInfo(id, ['cash'], addedAmount);
  },

  startTurn: () => {
    const firstPlayer = get().playerInfos[0];
    get().updateNestedPlayerInfo(firstPlayer.id, ['isCurrentTurn'], true);
  },

  nextTurn: (currentPlayer) => {
    const currentIndex = get().playerInfos.findIndex((player) => player.id === currentPlayer.id);
    const nextIndex = (currentIndex + 1) % get().playerInfos.length;
    const nextPlayer = get().playerInfos[nextIndex];

    set((state) => {
      const updatedPlayerInfos = state.playerInfos.map((player) => ({
        ...player,
        isCurrentTurn: player.id === nextPlayer.id,
      }));

      gameStore.getState().syncPlayers(updatedPlayerInfos);

      return {
        ...state,
        playerInfos: updatedPlayerInfos,
      };
    });
  },
}));

playerStore.getState().loadGamePlayers();

export default playerStore;
