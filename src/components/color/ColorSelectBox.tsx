import Random from "../../../src/assets/Random.svg?react";
import { useState } from "react";
import { ColorOption, ValueLabel } from "../input/InputWithRandomButton";
import ColorElem from "./ColorElem";

const ColorSelectBox = ({ colorOptions }: { colorOptions: ColorOption[] }) => {
  const [color, setColor] = useState<ValueLabel>(
    colorOptions[0].value as ValueLabel
  );

  return (
    <div className="color-container">
      <div className="elem-container">
        {colorOptions.map(({ label, value }, index) => (
          <ColorElem
            key={`elem-${label}-${value}`}
            label={label}
            value={value}
            color={color}
            setColor={setColor}
          />
        ))}
      </div>
      <button
        className="btn btn-random"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <Random />
      </button>
    </div>
  );
};

export default ColorSelectBox;
