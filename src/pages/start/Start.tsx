import { useState } from "react";
import InputWithRandomButton from "../../components/input/InputWithRandomButton";
import ArrowDown from "../../../src/assets/ArrowDown.svg?react";
import { useNavigate } from "react-router-dom";
import Player from "./Player";

const Start = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(2);
  return (
    <div className="container">
      <div className="start-container">
        <h1 className="game-title">게임 설정</h1>
        <InputWithRandomButton
          label="게임 이름"
          placeholder="게임 이름을 설정해주세요"
        />
        <div
          className={`select-input ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="select-label">플레이어 수</div>
          <div className="selected">
            <div className="label">{playerNumber}명</div>
            <button className="icon">
              <ArrowDown />
            </button>
          </div>
          <div className="select-box">
            {isOpen &&
              Array(5)
                .fill(undefined)
                .map((_, index) => (
                  <div
                    className="select-elem"
                    onClick={() => setPlayerNumber(index + 2)}
                  >
                    {index + 2}명
                  </div>
                ))}
          </div>
        </div>
        <Player playerNumber={playerNumber} />
        <div className="btn btn-start" onClick={() => navigate("/game")}>
          게임시작
        </div>
      </div>
    </div>
  );
};
export default Start;
