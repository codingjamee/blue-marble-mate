import Random from '../../assets/Random.svg?react';
import { GameNameType } from '../../stores/gameStore';
import { PlayerNamesType } from '../../stores/playerStore';
interface Props {
  label: string;
  placeholder: string;
  onClickRandom: () => void;
  onChangeFn: (value: string) => void;
  value: GameNameType | PlayerNamesType['name'];
}
const InputWithRandomButton = ({ label, placeholder, onClickRandom, onChangeFn, value }: Props) => {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <div className="input-btn">
        <input
          value={value}
          name={label}
          placeholder={placeholder}
          onChange={(e) => onChangeFn(e.target.value)}
        />
        <button className="btn btn-random" onClick={onClickRandom}>
          <Random />
        </button>
      </div>
    </div>
  );
};
export default InputWithRandomButton;
