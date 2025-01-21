import GameList from './GameList';
import Before from '../../assets/Before.svg?react';
import ArrowDown from '../../assets/ArrowDown.svg?react';

const Saved = () => {
  return (
    <section className="container">
      <div className="game-list">
        <header className="saved-header">
          <div className="saved">
            <Before />
            <h3>저장된 게임</h3>
          </div>
          <div className="btn btn-border">
            <div className="title">최신순</div>
            <ArrowDown />
          </div>
        </header>
        <GameList />
        <GameList />
        <GameList />
        <GameList />
      </div>
    </section>
  );
};

export default Saved;
