import { BuildingRentType } from '../../../utils/mapType';
import { hasBuildingType } from '../../../utils/utils';

type BuildingOption = {
  type: Exclude<BuildingRentType, 'land'>;
  label: string;
  value: Exclude<BuildingRentType, 'land'>;
};

const BUILDING_OPTIONS: BuildingOption[] = [
  { type: 'villa1', label: '별장1', value: 'villa1' },
  { type: 'villa2', label: '별장2', value: 'villa2' },
  { type: 'building', label: '빌딩', value: 'building' },
  { type: 'hotel', label: '호텔', value: 'hotel' },
];

interface BuildingSelectProps {
  buildings: string[];
  setBuilding: React.Dispatch<React.SetStateAction<'villa1' | 'villa2' | 'building' | 'hotel'>>;
}

const BuildingSelect = ({ buildings, setBuilding }: BuildingSelectProps) => {
  console.log('in building Select', buildings);
  const buildingOptions = BUILDING_OPTIONS.map(
    ({ type, label, value }) =>
      hasBuildingType(buildings, type) && (
        <button
          key={type}
          className="btn btn-border"
          onClick={(e) => {
            e.stopPropagation();
            setBuilding(value);
          }}
        >
          {label}
        </button>
      ),
  );
  console.log(buildingOptions);
  return <div className="building-select">{buildingOptions}</div>;
};
export default BuildingSelect;
