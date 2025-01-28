// gameStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateRandomGameName } from '../utils/sessionNaming';
import playerStore, { PlayerNamesType } from './playerStore';
import dayjs from 'dayjs';
import { createStore, UseStore } from 'idb-keyval';
import { customStorage, loadGameService, startGameService, updateGameService } from './gameLogic';

export interface GameState {
  gameName: string;
  isOnline: boolean;
  gameState: boolean;
  players: PlayerNamesType[];
  createdAt: dayjs.Dayjs | null;
  round: number;
  currentStore: ReturnType<typeof createStore> | null;
  gameList: string[]; // 모든 게임 이름 목록
  setGameName: (name: string) => Promise<void>;
  updateRandomGameName: () => Promise<void>;
  updateEmptyGameName: () => Promise<void>;
  startGame: (value?: boolean) => Promise<void>;
  loadGame: () => Promise<GameData | null | undefined>;
  endGame: (value?: boolean) => void;
  resetGame: () => void;
  deleteGame: (name: string) => Promise<void>;
  createNewStore: (name: string) => Promise<UseStore>;
}

export interface GameData {
  gameName: string;
  players: PlayerNamesType[];
  createdAt: dayjs.Dayjs;
  gameState: boolean;
}

// 메인 스토어 생성
const mainStore: UseStore = createStore('main-game-db', 'main-game-store');

const gameStore = create<GameState>()(
  persist(
    (setState, getState) => ({
      gameName: '',
      isOnline: navigator.onLine,
      gameState: false,
      players: [],
      createdAt: null,
      currentStore: null,
      gameList: [], // 게임 목록 초기화
      round: 1,

      createNewStore: async (name: string) => {
        const newStore = createStore(`${name}-db`, `${name}-store`);
        setState({ currentStore: newStore });
        return newStore;
      },

      setGameName: async (name) => {
        setState({ gameName: name });
      },

      updateRandomGameName: async () => {
        const newName = generateRandomGameName();
        await getState().setGameName(newName);
      },

      updateEmptyGameName: async () => {
        const state = getState();
        if (state.gameName.length === 0) {
          await getState().updateRandomGameName();
        }
      },

      startGame: async (value) => {
        await startGameService(setState, getState, {
          gameName: getState().gameName,
          playerStore,
          mainStore,
        });
      },

      loadGame: async () => {
        const result = await loadGameService(setState, getState, { mainStore });
        return result;
      },

      // updatePlayer: async (id, value) => {
      //   const playerInfo = playerStore
      //   const result = await updateGameService(setState, getState, {
      //     playerStore,
      //   });
      //   return result;
      // },

      deleteGame: async (name: string) => {
        // 게임 목록에서 제거
        setState((state) => ({
          gameList: state.gameList.filter((gameName) => gameName !== name),
        }));
        // TODO: 해당 게임의 스토어 삭제 로직 추가
      },

      resetGame: () => {
        setState({ gameName: '', players: [] });
      },

      endGame: (value) => setState({ gameState: value ?? false }),
    }),
    {
      name: 'game-store',
      storage: createJSONStorage(() => customStorage(mainStore)),
      partialize: (state) =>
        ({
          gameName: state.gameName,
          gameList: state.gameList,
        }) as GameState,
    },
  ),
);

// 온라인 상태 이벤트 리스너
window.addEventListener('online', () => gameStore.setState({ isOnline: true }));
window.addEventListener('offline', () => gameStore.setState({ isOnline: false }));

// 초기 로드
gameStore.getState().loadGame();

export default gameStore;
