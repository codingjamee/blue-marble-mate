import playerStore from '../../stores/playerStore';

const Lucky = () => {
  const currentPlayer = playerStore().getNowTurn();
  return (
    <>
      {currentPlayer.luckyKeys && currentPlayer.luckyKeys.length > 0 && (
        <section className="lucky console-container" aria-labelledby="lucky-title">
          <h3 className="base">
            <div>{currentPlayer.name}의</div>
            <div>행운의 열쇠 🔑</div>
          </h3>
          <ul className="lucky-items">
            {currentPlayer.luckyKeys.map((key) => (
              <li className="lucky-item" key={`${key.id}-${key.name}`}>
                <article className="lucky-card ">
                  <h4>{key.name}</h4>
                  <button className="btn btn-border" type="button" aria-label="통행료 면제권 사용">
                    사용
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
export default Lucky;
