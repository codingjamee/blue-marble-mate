import Checked from "../../../src/assets/Checked.svg?react";

const ColorElem = ({ label, value, color, setColor }) => {
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
      {color === value && (
        <div
          className={`${label === "노랑" ? "checked-black" : "color-checked"}`}
        >
          <Checked />
        </div>
      )}
    </div>
  );
};

export default ColorElem;
