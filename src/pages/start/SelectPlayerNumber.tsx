import ArrowDown from '../../assets/ArrowDown.svg?react';
import playerStore from '../../stores/playerStore';
import SelectElem from './SelectElem';
import { OpenType } from './Start';

interface Props {
  isOpen: OpenType;
  setIsOpen: React.Dispatch<React.SetStateAction<OpenType>>;
}

const SelectPlayerNumber = ({ isOpen, setIsOpen }: Props) => {
  const { playerNumber } = playerStore((state) => state);

  return (
    <div
      className={`select-input ${isOpen ? 'open' : ''}`}
      onClick={() => {
        setIsOpen((prev: boolean) => !prev);
      }}
    >
      <h4 className="select-label">플레이어 수</h4>
      <div className="selected">
        <div className="label">{playerNumber}명</div>
        <button className={`icon ${isOpen ? 'rotate' : ''}`}>
          <ArrowDown />
        </button>
      </div>
      <div className="select-box">{isOpen && <SelectElem />}</div>
    </div>
  );
};

export default SelectPlayerNumber;
