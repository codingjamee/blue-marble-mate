import Random from '../../assets/Random.svg?react';
interface Props {
  label: string;
  placeholder: string;
  onClickRandom: () => void;
  onChangeFn: (value: string) => void;
}
const InputWithRandomButton = ({ label, placeholder, onClickRandom, onChangeFn }: Props) => {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <div className="input-btn">
        <input
          name={label}
          placeholder={placeholder}
          onChange={(e) => onChangeFn(e.target.value)}
        />
        <button
          className="btn btn-random"
          onClick={() => {
            console.log('random button clicked');
            onClickRandom();
          }}
        >
          <Random />
        </button>
      </div>
    </div>
  );
};
export default InputWithRandomButton;
