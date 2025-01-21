import User from '../../assets/User.svg?react';
import { PlayerType } from './PlayerInfo';

const Player = ({ player }: { player: PlayerType }) => {
  return (
    <article className="player" key={player.id}>
      <div className="name">
        <div style={{ color: `${player.playerColor}` }}>
          <User />
        </div>
        <h4>{player.name}</h4>
        {player.isCurrentTurn && (
          <div>
            <button className="turn" style={{ backgroundColor: `${player.playerColor}` }}>
              현재턴
            </button>
          </div>
        )}
      </div>
      <div className="description">
        <div className="loca">위치 : {`${player.position.name} ${player.position.number}`}</div>
        <div className="des">
          <h5>현금: </h5>
          <div>₩{player.cash}</div>
        </div>
        <div className="des">
          <h5>총 자산: </h5>
          <div>₩{player.cash}</div>
        </div>
      </div>
    </article>
  );
};
export default Player;
