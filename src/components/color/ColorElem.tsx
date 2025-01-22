import Checked from '../../assets/Checked.svg?react';
import { ColorOption } from '../../constants/colors';

interface Props {
  label: ColorOption['label'];
  value: ColorOption['value'];
  setColor: (value: ColorOption['value']) => void;
  checked: boolean;
}

const ColorElem = ({ label, value, setColor, checked }: Props) => {
  return (
    <div
      style={{ backgroundColor: value }}
      className="color-elem"
      onClick={() => {
        setColor(value);
        console.log(label);
      }}
      key={`${label}-${value}`}
    >
      {checked && (
        <div className={`${label === '노랑' ? 'checked-black' : 'color-checked'}`}>
          <Checked />
        </div>
      )}
    </div>
  );
};

export default ColorElem;
