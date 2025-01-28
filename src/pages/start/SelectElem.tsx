import playerStore from '../../stores/playerStore';

const SelectElem = () => {
  const { setPlayerNumber, updatePlayerNumber } = playerStore((state) => state);

  return Array(5)
    .fill(undefined)
    .map((_, index) => (
      <div
        className="select-elem"
        onClick={() => {
          setPlayerNumber(index + 2);
          updatePlayerNumber(index + 2);
        }}
        key={`elem-${index + 1}`}
      >
        {index + 2}명
      </div>
    ));
};

export default SelectElem;
