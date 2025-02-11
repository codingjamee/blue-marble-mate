import { PlayState } from '../../../stores/gamePlayType';

interface Props {
  onAction: PlayState['handleUserAction'];
  onBuildingPurchase: React.Dispatch<React.SetStateAction<boolean>>;
  isLandOwner: boolean | null | undefined;
  hasOwner: boolean;
  canSkipTurn: boolean;
}

const GameActionControls = ({
  onAction,
  onBuildingPurchase: setModal,
  isLandOwner,
  hasOwner,
  canSkipTurn,
}: Props) => {
  return (
    <section className="btns">
      {isLandOwner && <button className="btn btn-common">건물 업그레이드</button>}
      {hasOwner && !isLandOwner && (
        <button className="btn btn-common tolls" onClick={() => onAction('PAY_RENT')}>
          통행료 지불
        </button>
      )}
      {!hasOwner && (
        <button className="btn btn-border" onClick={() => onAction('BUY')}>
          땅 매입
        </button>
      )}
      {isLandOwner && (
        <>
          <button className="btn btn-border" onClick={() => setModal(true)}>
            건물 매입
          </button>
          <button className="btn btn-border" onClick={() => onAction('SELL')}>
            건물 매각
          </button>
        </>
      )}
      {canSkipTurn && (
        <button className="btn btn-border" onClick={() => onAction('SKIP')}>
          턴 종료
        </button>
      )}
    </section>
  );
};

export default GameActionControls;
