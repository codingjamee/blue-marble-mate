import usePlayStore from '../../stores/gamePlayStore';

const GameControl = () => {
  const handleUserAction = usePlayStore((state) => state.handleUserAction);

  return (
    <section className="console-container">
      <div className="building">
        <h3>위치 정보 및 게임 컨트롤</h3>
        <section className="des-section">
          <div className="des">
            <div>현재 위치 소유주:</div>
            <div className="owner">플레이어 1</div>
          </div>
          <div className="des staus">
            <div>건물 상태:</div>
            <div>빌딩 Level 2</div>
          </div>
          <div className="des">
            <div>통행료: </div>
            <div className="tolls">₩ 150,000</div>
          </div>
        </section>
        <section className="btns">
          <button className="btn btn-common">건물 업그레이드</button>
          <button className="btn btn-common tolls">통행료 지불</button>
          <button className="btn btn-border" onClick={() => handleUserAction('BUY', true)}>
            건물 매입
          </button>
          <button className="btn btn-border" onClick={() => handleUserAction('SELL', true)}>
            건물 매각
          </button>
          <button className="btn btn-border" onClick={() => handleUserAction('SKIP', true)}>
            턴 종료
          </button>
        </section>
      </div>
    </section>
  );
};
export default GameControl;
