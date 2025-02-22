import { useNavigate } from 'react-router-dom';
import gameStore from '../stores/gameStore';

const HeaderNavi = () => {
  const navigate = useNavigate();
  const { gameState } = gameStore();
  return (
    <ul className="navi-container">
      <li onClick={() => navigate('/')}>홈</li>
      {!gameState && <li onClick={() => navigate('/start')}>게임시작</li>}
      <li onClick={() => navigate('/rank')}>랭킹</li>
      <li onClick={() => navigate('/community')}>커뮤니티</li>
    </ul>
  );
};

export default HeaderNavi;
