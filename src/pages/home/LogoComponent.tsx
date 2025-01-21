import { useNavigate } from "react-router-dom";

const LogoComponent = () => {
  return (
    <div className="logo-container">
      <header>
        <div>Logo</div>
        <h1 className="game-title">BlueMarble Mate</h1>
      </header>
      <main className="p-4">
        <p className="game-subtitle">블루마블을 저와함께 편하게 즐겨보세요</p>
      </main>
    </div>
  );
};

export default LogoComponent;
