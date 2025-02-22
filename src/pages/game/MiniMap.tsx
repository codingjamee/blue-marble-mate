import { BoardData } from '../../utils/mapType';
import Cell from './Cell';

interface MiniMapProps {
  BOARD_DATA: BoardData;
}

const MiniMap = ({ BOARD_DATA }: MiniMapProps) => {
  return (
    <div className="board-game">
      <div className="board console-container">
        <div className="top-row">
          {BOARD_DATA.top.map((cell) => (
            <Cell key={`${cell.id}-${cell.name}`} data={cell} position={'top'} />
          ))}
        </div>
        <div className="middle-section">
          <div className="left-column">
            {BOARD_DATA.left.map((cell) => (
              <Cell key={`${cell.id}-${cell.name}`} data={cell} position={'left'} />
            ))}
          </div>
          <div className="center-area">
            <div className="logo">부루마불</div>
            <img src="/BackgroundSpace.jpg" alt="" />
            <div className="line"></div>
            <img src="/station.png" alt="" className="station" />
          </div>
          <div className="right-column">
            {BOARD_DATA.right.map((cell) => (
              <Cell key={`${cell.id}-${cell.name}`} data={cell} position={'right'} />
            ))}
          </div>
        </div>
        <div className="bottom-row">
          {BOARD_DATA.bottom.map((cell) => (
            <Cell key={`${cell.id}-${cell.name}`} data={cell} position={'bottom'} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
