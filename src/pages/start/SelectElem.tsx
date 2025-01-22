import playerStore from '../../stores/playerStore';

const SelectElem = () => {
  const { setPlayerNumber, setPlayerInit } = playerStore((state) => state);

  return Array(5)
    .fill(undefined)
    .map((_, index) => (
      <div
        className="select-elem"
        onClick={() => {
          setPlayerNumber(index + 2);
          setPlayerInit(index + 2);
        }}
        key={`elem-${index + 1}`}
      >
        {index + 2}명
      </div>
    ));
};

export default SelectElem;
