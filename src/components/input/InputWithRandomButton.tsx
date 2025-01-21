import Random from "../../../src/assets/Random.svg?react";
import ColorSelectBox from "../color/ColorSelectBox";

type ColorLabel = "빨강" | "초록" | "파랑" | "노랑" | "보라" | "주황";
export type ValueLabel =
  | "#FF0000"
  | "#00FF00"
  | "#0000FF"
  | "#FFFF00"
  | "#800080"
  | "#FFA500";
export type ColorOption = Record<"label" | "value", ColorLabel | ValueLabel>;

const InputWithRandomButton = ({
  label,
  placeholder,
  colorSelect,
}: {
  label: string;
  placeholder: string;
  colorSelect?: boolean;
}) => {
  const colorOptions: ColorOption[] = [
    { label: "빨강", value: "#FF0000" },
    { label: "초록", value: "#00FF00" },
    { label: "파랑", value: "#0000FF" },
    { label: "노랑", value: "#FFFF00" },
    { label: "보라", value: "#800080" },
    { label: "주황", value: "#FFA500" },
  ];

  return (
    <div className="random-input">
      <div className="input-container">
        <label htmlFor={label}>{label}</label>
        <div className="input-btn">
          <div className="input-btn">
            <input name={label} placeholder={placeholder} onChange={() => {}} />
            <button
              className="btn btn-random"
              onClick={() => {
                console.log("random button clicked");
              }}
            >
              <Random />
            </button>
          </div>
          {colorSelect && <ColorSelectBox colorOptions={colorOptions} />}
        </div>
      </div>
    </div>
  );
};
export default InputWithRandomButton;
