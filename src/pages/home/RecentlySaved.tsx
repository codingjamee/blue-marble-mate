const RecentlySaved = () => {
  return (
    <div className="recently-container">
      최근 저장된 게임
      <button className="btn btn-saved">
        <div className="des-container">
          <div className="des-title">
            <div className="title">세이브1</div>
            <div className="player">4명의 플레이어</div>
          </div>
          <div className="des-sub">
            <div>2024.02.20</div>
            <div className="progress">진행률 45%</div>
          </div>
        </div>
      </button>
      <button className="btn btn-saved">
        <div className="des-container">
          <div className="des-title">
            <div className="title">세이브2</div>
            <div className="player">4명의 플레이어</div>
          </div>
          <div className="des-sub">
            <div>2024.02.20</div>
            <div className="progress">진행률 45%</div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default RecentlySaved;
