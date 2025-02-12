import Dice from './Dice';
import GameControl from './control/GameControl';
import MiniMap from './MiniMap';
import PlayerInfo from './PlayerInfo';
import { BOARD_DATA } from '../../utils/mapInfo';
import gameStore from '../../stores/gameStore';
import landStore from '../../stores/landStore';
import playerStore from '../../stores/playerStore';

const Game = () => {
  const { gameName, updateGameState, round } = gameStore((state) => state);
  const currentPlayer = playerStore.getState().getNowTurn();
  const landInfo = landStore.getState().getLandInfo(currentPlayer.position.id);

  const gameState = gameStore((state) => state.gameState);
  const ownerAndRent = landStore
    .getState()
    .getLandOwnerAndRent(currentPlayer.position.id, currentPlayer.id);
  const ownerLand = landInfo && landInfo.type === 'city';
  const isCurrentPlayerOwner = ownerLand && ownerAndRent.isCurrentPlayerOwner;

  return (
    <section className="container">
      <div onClick={() => updateGameState(false)}>게임종료 </div>
      <div className="game-container">
        <nav className="left-console">
          <div className="name">
            <h1>{gameName}</h1>
            <div>
              <button className="btn btn-dark">라운드 {round}</button>
            </div>
          </div>
          {gameState ? (
            <Dice isCurrentPlayerOwner={isCurrentPlayerOwner} />
          ) : (
            <div className="console-container" onClick={() => updateGameState(true)}>
              <button className="btn btn-common">게임 시작하기</button>
            </div>
          )}
          <GameControl />
        </nav>
        <section className="map-container">
          <MiniMap BOARD_DATA={BOARD_DATA} />
        </section>
        <nav className="right-console">
          <PlayerInfo />
        </nav>
      </div>
    </section>
  );
};
export default Game;
