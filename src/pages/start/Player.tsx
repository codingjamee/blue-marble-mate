import InputWithRandomButton from "../../components/input/InputWithRandomButton";

const Player = ({ playerNumber }: { playerNumber: number }) => {
  return Array(playerNumber)
    .fill(null)
    .map((_, index) => (
      <InputWithRandomButton
        label={`플레이어 ${index + 1}`}
        placeholder={`플레이어 ${index + 1}의 이름을 입력해주세요`}
        colorSelect={true}
      />
    ));
};

export default Player;
