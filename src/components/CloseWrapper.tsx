const CloseWrapper = ({ onClickWrapper }: { onClickWrapper: () => void }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}
      onClick={() => onClickWrapper()}
    />
  );
};
export default CloseWrapper;
