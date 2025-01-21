import Users from '../../assets/Users.svg?react';
import Bins from '../../assets/Bins.svg?react';
import Progress from '../../components/Progress';

const GameList = () => {
  return (
    <button className="btn btn-saved">
      <div className="des-container">
        <div className="des-title">
          <div className="string-container">
            <div className="title">세이브1</div>
            <div className="player">
              <Users />
              <div>4명의 플레이어</div>
              <div className="date">2024.02.20 15:30</div>
            </div>
          </div>
          <div className="action-btns">
            <button className="btn btn-dark">이어하기</button>
            <Bins />
          </div>
        </div>
        <Progress progress={20} />
        <div className="des-sub"></div>
      </div>
    </button>
  );
};

export default GameList;
