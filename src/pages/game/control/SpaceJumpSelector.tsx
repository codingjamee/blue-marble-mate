import gameStore from '../../../stores/gameStore';
import { LandType } from '../../../utils/mapType';

interface Props {
  setPosition: React.Dispatch<React.SetStateAction<LandType['id']>>;
}

const SpaceJumpSelector = ({ setPosition }: Props) => {
  const LANDS = gameStore.getState().lands;

  return (
    <div className="building-select warp">
      {LANDS.map((lands) => (
        <button
          key={`${lands.id}_${lands.name}`}
          className="btn btn-border"
          onClick={(e) => {
            e.stopPropagation();
            setPosition(lands.id);
          }}
        >
          {lands.name}
        </button>
      ))}
    </div>
  );
};

export default SpaceJumpSelector;
