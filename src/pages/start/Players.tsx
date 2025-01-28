import InputWithRandomButton from '../../components/input/InputWithRandomButton';
import playerStore from '../../stores/playerStore';
import ColorSelectBox from '../../components/color/ColorSelectBox';

const Players = () => {
  const { updatePlayerName, updateRandomPlayerName, playerInfos } = playerStore();

  return playerInfos.map(({ id, playerColor }, index) => (
    <section className="players-container" key={`${id}-${playerColor}`}>
      <InputWithRandomButton
        value={playerInfos[index].name}
        label={`플레이어 ${index + 1} 이름 : ${playerInfos[index]?.name || `플레이어 ${index + 1}`}`}
        key={`player-${index + 1}`}
        placeholder={`플레이어 ${index + 1}의 이름을 입력해주세요`}
        onClickRandom={() => updateRandomPlayerName(id)}
        onChangeFn={(value) => updatePlayerName(index, value)}
      />
      <ColorSelectBox playerId={id} playerColor={playerColor} />
    </section>
  ));
};

export default Players;
