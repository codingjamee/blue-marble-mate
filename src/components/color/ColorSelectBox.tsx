import Random from '../../assets/Random.svg?react';
import ColorElem from './ColorElem';
import playerStore from '../../stores/playerStore';
import { ColorOption, colorOptions } from '../../constants/colors';

const ColorSelectBox = ({
  playerId,
  playerColor,
}: {
  playerId: string;
  playerColor: ColorOption['value'];
}) => {
  const { updatePlayerColor, updateRandomPlayerColor } = playerStore((state) => state);
  const unAvailableColors = playerStore((state) => state.playerInfos).map((p) => p.playerColor);

  return (
    <div className="color-container">
      <div className="elem-container">
        {colorOptions.map(({ label, value }) => (
          <ColorElem
            key={`elem-${label}-${value}`}
            label={label}
            value={value}
            setColor={() => {
              !unAvailableColors.includes(value) && updatePlayerColor(playerId, value);
            }}
            checked={playerColor === value}
          />
        ))}
      </div>
      <button className="btn btn-random" onClick={() => updateRandomPlayerColor(playerId)}>
        <Random />
      </button>
    </div>
  );
};

export default ColorSelectBox;
