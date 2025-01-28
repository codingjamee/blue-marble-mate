import playerStore from '../../stores/playerStore';
import Lucky from './Lucky';
import Player from './Player';

export interface PlayerType {
  id: number;
  name: string;
  property: {
    propertyId: string;
    name: string;
    buildings: {
      villa: boolean;
      building: boolean;
      hotel: boolean;
    }[];
  }[];
  luckyKeys: {
    name: string;
  }[];
  cash: number;
  position: {
    name: string;
    number: string;
  };
  isInIsland: boolean;
  islandTurnLeft: number;
  playerColor: string;
  isCurrentTurn: boolean;
}

const players: PlayerType[] = [
  {
    id: 1,
    name: '플레이어 1',
    property: [
      {
        propertyId: 'city-1',
        name: '상파울루',
        buildings: [{ villa: false, building: false, hotel: false }],
      },
    ],
    luckyKeys: [{ name: '통행료 면제권' }, { name: '건물 수리 보수권' }],
    cash: 200000,
    position: { name: '파란색 구역', number: '3' },
    isInIsland: false,
    islandTurnLeft: 0,
    playerColor: 'blue',
    isCurrentTurn: false,
  },
  {
    id: 2,
    name: '플레이어 2',
    property: [
      {
        propertyId: 'city-2',
        name: '취리히',
        buildings: [{ villa: false, building: false, hotel: false }],
      },
    ],
    luckyKeys: [{ name: '통행료 면제권' }, { name: '건물 수리 보수권' }],
    cash: 190000,
    position: { name: '노란색 구역', number: '3' },
    isInIsland: false,
    islandTurnLeft: 0,
    playerColor: 'red',
    isCurrentTurn: true,
  },
  {
    id: 3,
    name: '플레이어 3',
    property: [
      {
        propertyId: 'city-3',
        name: '아테네',
        buildings: [{ villa: false, building: false, hotel: false }],
      },
    ],
    luckyKeys: [{ name: '통행료 면제권' }, { name: '건물 수리 보수권' }],
    cash: 130000,
    position: { name: '빨간색 구역', number: '3' },
    isInIsland: false,
    islandTurnLeft: 0,
    playerColor: 'green',
    isCurrentTurn: false,
  },
];

const PlayerInfo = () => {
  const playerInfos = playerStore((state) => state.playerInfos);
  console.log(playerInfos);
  return (
    <>
      <Lucky />
      <section className="player-container console-container">
        <h3>플레이어 정보</h3>
        <section className="players">
          {playerInfos.map((player) => (
            <Player player={player} key={`${player.id}-${player.name}`} />
          ))}
        </section>
      </section>
    </>
  );
};
export default PlayerInfo;
