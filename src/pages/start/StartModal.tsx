import { GameState } from '../../stores/gameStore';
import { PlayerNamesType } from '../../stores/playerStore';

interface Props {
  gameName: GameState['gameName'];
  playerNames: PlayerNamesType[];
}

const StartModal = ({ gameName, playerNames }: Props) => {
  return (
    <div>
      <section className="container">
        <div className="start-modal">
          <h1>게임을 시작합니다</h1>
          게임명 : <h3>{gameName}</h3>
          <div className="m-players-container">
            <div className="player-num">
              <div>플레이어 수 : </div>
              <div>{playerNames.length}명</div>
            </div>
            {playerNames.map((player, index) => (
              <div className="players" key={`${player.id}-${player.name}`}>
                <div className="p-label">
                  player {index + 1} : {player.name}
                </div>
                <div className="p-color" style={{ backgroundColor: player.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default StartModal;
