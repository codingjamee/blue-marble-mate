import { useState } from 'react';
import InputWithRandomButton from '../../components/input/InputWithRandomButton';
// import { useNavigate } from 'react-router-dom';
import Players from './Players';
import CloseWrapper from '../../components/CloseWrapper';
import SelectPlayerNumber from './SelectPlayerNumber';
import playerStore from '../../stores/playerStore';
import gameStore from '../../stores/gameStore';

export type OpenType = boolean;

const Start = () => {
  // const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<OpenType>(false);
  const { playerNames, updateEmptyName } = playerStore();
  const { setGameName, updateRandomGameName, updatEmptyGameName, gameName } = gameStore();

  return (
    <>
      {isOpen && <CloseWrapper onClickWrapper={() => setIsOpen(false)} />}
      <div className="container">
        <div className="start-container">
          <h1 className="game-title">게임 설정</h1>
          <InputWithRandomButton
            label="게임 이름"
            placeholder="게임 이름을 설정해주세요"
            onClickRandom={() => {
              updateRandomGameName();
            }}
            value={gameName}
            onChangeFn={(value) => setGameName(value)}
          />
          <SelectPlayerNumber isOpen={isOpen} setIsOpen={setIsOpen} />
          <Players />
          <div
            className="btn btn-start"
            onClick={() => {
              console.log(gameName);
              console.log(playerNames);
              // navigate('/game');
              updateEmptyName();
              updatEmptyGameName();
            }}
          >
            게임시작
          </div>
        </div>
      </div>
    </>
  );
};
export default Start;
