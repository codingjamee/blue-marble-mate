import { useState } from 'react';
import { BOARD_DATA, BoardData } from '../../utils/mapInfo';
import Cell from './Cell';

interface MiniMapProps {
  size?: number; // 미니맵의 전체 크기
  data: BoardData;
}

const MiniMap = ({ size = 200, data }: MiniMapProps) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [diceNumber, setDiceNumber] = useState<Partial<number>>();

  const rollDice = () => {
    const newDice = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(newDice);
    setCurrentPosition((prev) => (prev + newDice) % 28);
  };

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
            <button className="dice-button" onClick={rollDice}>
              주사위 굴리기 {diceNumber && `(${diceNumber})`}
            </button>
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
