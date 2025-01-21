const Lucky = () => {
  return (
    <section className="lucky console-container" aria-labelledby="lucky-title">
      <h3 className="base">
        <div>플레이어 1의</div>
        <div>행운의 열쇠 🔑</div>
      </h3>
      <ul className="lucky-items">
        <li className="lucky-item">
          <article className="lucky-card ">
            <h4>통행료 면제권</h4>
            <button className="btn btn-border" type="button" aria-label="통행료 면제권 사용">
              사용
            </button>
          </article>
        </li>
        <li className="lucky-item">
          <article className="lucky-card ">
            <h4>건물 수리 보수권</h4>
            <button className="btn btn-border" type="button" aria-label="건물 수리 보수권 사용">
              사용
            </button>
          </article>
        </li>
        <li className="lucky-item">
          <article className="lucky-card ">
            <h4>원하는 곳으로 이동</h4>
            <button className="btn btn-border" type="button" aria-label="원하는 곳으로 이동 사용">
              사용
            </button>
          </article>
        </li>
      </ul>
    </section>
  );
};
export default Lucky;
