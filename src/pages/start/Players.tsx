import InputWithRandomButton from '../../components/input/InputWithRandomButton';
import usePlayerStore from '../../stores/usePlayerStore';
import ColorSelectBox from '../../components/color/ColorSelectBox';

const Players = () => {
  const { updatePlayerName, playerNames } = usePlayerStore((state) => state);

  console.log(playerNames);

  return playerNames.map(({ id, color }, index) => (
    <section className="players-container">
      <InputWithRandomButton
        label={`플레이어 ${index + 1} 이름 : ${playerNames[index]?.name || `플레이어 ${index + 1}`}`}
        key={`player-${index + 1}`}
        placeholder={`플레이어 ${index + 1}의 이름을 입력해주세요`}
        onClickRandom={() => {}}
        onChangeFn={(value) => updatePlayerName(index, value)}
      />
      <ColorSelectBox playerId={id} playerColor={color} />
    </section>
  ));
};

export default Players;
