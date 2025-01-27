import Dice from './Dice';
import GameControl from './GameControl';
import MiniMap from './MiniMap';
import Lucky from './Lucky';
import PlayerInfo from './PlayerInfo';
import { BOARD_DATA } from '../../utils/mapInfo';
import gameStore from '../../stores/gameStore';
import { useEffect } from 'react';

const Game = () => {
  const { players, gameName } = gameStore((state) => state);
  console.log({ players, gameName });

  return (
    <section className="container">
      <div className="game-container">
        <nav className="left-console">
          <div className="name">
            <h1>{gameName}</h1>
            <div>
              <button className="btn btn-dark">라운드 3</button>
            </div>
          </div>

          <Dice />
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
