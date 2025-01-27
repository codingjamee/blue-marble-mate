import InputWithRandomButton from '../../components/input/InputWithRandomButton';
import playerStore from '../../stores/playerStore';
import ColorSelectBox from '../../components/color/ColorSelectBox';

const Players = () => {
  const { updatePlayerName, updateRandomPlayerName, playerNames } = playerStore();

  console.log(playerNames);

  return playerNames.map(({ id, color }, index) => (
    <section className="players-container" key={`${id}-${color}`}>
      <InputWithRandomButton
        value={playerNames[index].name}
        label={`플레이어 ${index + 1} 이름 : ${playerNames[index]?.name || `플레이어 ${index + 1}`}`}
        key={`player-${index + 1}`}
        placeholder={`플레이어 ${index + 1}의 이름을 입력해주세요`}
        onClickRandom={() => updateRandomPlayerName(id)}
        onChangeFn={(value) => updatePlayerName(index, value)}
      />
      <ColorSelectBox playerId={id} playerColor={color} />
    </section>
  ));
};

export default Players;
