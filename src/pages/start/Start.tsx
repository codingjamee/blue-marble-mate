import { useState } from 'react';
import InputWithRandomButton from '../../components/input/InputWithRandomButton';
// import { useNavigate } from 'react-router-dom';
import Players from './Players';
import CloseWrapper from '../../components/CloseWrapper';
import SelectPlayerNumber from './SelectPlayerNumber';
import usePlayerStore from '../../stores/usePlayerStore';

export interface PlayerNamesType {
  id: string;
  name: string;
  color: string;
}

export type OpenType = boolean;

const Start = () => {
  // const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<OpenType>(false);
  const { setGameName, gameName, playerNames } = usePlayerStore((state) => state);

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
              setGameName('set randomValue');
            }}
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
