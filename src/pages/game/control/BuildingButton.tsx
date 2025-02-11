import { hasBuildingType } from '../../../utils/utils';

type BuildingOption = {
  type: 'villa' | 'building' | 'hotel';
  label: string;
  value: 'villa1' | 'building' | 'hotel';
};

const BUILDING_OPTIONS: BuildingOption[] = [
  { type: 'villa', label: '별장', value: 'villa1' },
  { type: 'building', label: '빌딩', value: 'building' },
  { type: 'hotel', label: '호텔', value: 'hotel' },
];

interface BuildingSelectProps {
  buildings: string[];
  setBuilding: React.Dispatch<React.SetStateAction<'villa1' | 'villa2' | 'building' | 'hotel'>>;
}

const BuildingSelect = ({ buildings, setBuilding }: BuildingSelectProps) => {
  return (
    <div className="building-select">
      {BUILDING_OPTIONS.map(
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
      )}
    </div>
  );
};
export default BuildingSelect;
