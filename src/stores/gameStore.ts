// gameStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateRandomGameName } from '../utils/sessionNaming';
import playerStore from './playerStore';
import { createStore, UseStore } from 'idb-keyval';
import { customStorage, loadGameService, saveToDB, startGameService } from './gameLogic';
import landStore from './landStore';
import { GameState } from './gameStoreType';

// 메인 스토어 생성
export const mainStore: UseStore = createStore('main-game-db', 'main-game-store');

const gameStore = create<GameState>()(
  persist(
    (setState, getState) => ({
      gameName: '',
      isOnline: navigator.onLine,
      gameState: false,
      players: [],
      lands: [],
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

      updateGameState: (state: boolean) => {
        setState({ gameState: state });
      },

      startGame: async () => {
        await startGameService(setState, getState, {
          gameName: getState().gameName,
          playerStore,
          mainStore,
          landStore,
        });
        // Land Store 초기화
        landStore.setState({ currentGameName: getState().gameName });
        await landStore.getState().initializeLands();

        getState().loadGame();
        playerStore.getState().startTurn();
      },

      loadGame: async () => {
        const result = await loadGameService(setState, getState, { mainStore });
        landStore.getState().loadGameLands();

        return result;
      },

      syncPlayers: (players) => {
        setState({ players });
        saveToDB({ get: getState, players });
      },

      syncLands: (lands) => {
        setState({ lands });
        saveToDB({ get: getState, lands });
      },

      deleteGame: async (name: string) => {
        // 게임 목록에서 제거
        setState((state) => ({
          gameList: state.gameList.filter((gameName) => gameName !== name),
        }));
        // TODO: 해당 게임의 스토어 삭제 로직 추가
      },

      resetGame: () => {
        setState({ gameName: '', players: [] });
        playerStore.getState().setPlayerInit();
        landStore.getState().initializeLands();
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
          players: state.players,
          gameState: state.gameState,
          createdAt: state.createdAt,
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
