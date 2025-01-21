import { useNavigate } from "react-router-dom";

const StartButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="buttons-container">
        <button className="btn btn-start" onClick={() => navigate("/start")}>
          새게임 시작하기
        </button>
        <button className="btn btn-saved" onClick={() => navigate("/saved")}>
          저장된 게임 불러오기
        </button>
      </div>
    </>
  );
};
export default StartButton;
