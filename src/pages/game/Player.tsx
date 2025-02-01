import User from '../../assets/User.svg?react';
import { PlayerNamesType } from '../../stores/playerType';

const Player = ({ player }: { player: PlayerNamesType }) => {
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
        <div className="loca">위치 : {`${player.position.position} ${player.position.name}`}</div>
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
