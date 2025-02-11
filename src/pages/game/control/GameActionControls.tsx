import { PlayState } from '../../../stores/gamePlayType';
import { isThisOwnableCity } from '../../../stores/landStore';
import { CityLandType, LandType } from '../../../utils/mapType';

interface Props {
  onAction: PlayState['handleUserAction'];
  onBuildingPurchase: React.Dispatch<React.SetStateAction<boolean>>;
  isLandOwner: boolean | null | undefined;
  canSkipTurn: boolean;
  landType: LandType['type'];
  landInfo: LandType | null;
}

export function isUnbuildable(land: LandType | null): land is CityLandType {
  const unbuildable = ['대한민국', '퀸엘리자베스호', '여객기', '우주'];
  if (!land || !('owner' in land) || !('country' in land)) return false;

  return !unbuildable.includes(land.country);
}

const GameActionControls = ({
  onAction,
  onBuildingPurchase: setModal,
  isLandOwner,
  canSkipTurn,
  landType,
  landInfo,
}: Props) => {
  const hasOwner = landInfo ? landInfo?.owner : null;
  const buildings = landInfo && landInfo?.buildings ? landInfo?.buildings.join(', ') : null;

  console.log('👊👊👊👊👊👊👊', canSkipTurn);
  return (
    <section className="btns">
      {isLandOwner && (
        <button className="btn btn-common" onClick={() => setModal(true)}>
          건물 업그레이드
        </button>
      )}
      {hasOwner && !isLandOwner && (
        <button className="btn btn-common tolls" onClick={() => onAction('PAY_RENT')}>
          통행료 지불
        </button>
      )}
      {!hasOwner && isThisOwnableCity(landInfo) && (
        <button className="btn btn-border" onClick={() => onAction('BUY')}>
          땅 매입
        </button>
      )}
      {landType === 'fund' && (
        <button className="btn btn-border" onClick={() => onAction('FUND_RECEIVE')}>
          사회복지기금 수령
        </button>
      )}
      {landType === 'fundRaise' && (
        <button className="btn btn-border" onClick={() => onAction('FUND_RAISE')}>
          사회복지기금 모금
        </button>
      )}
      {/* 대한민국이 아닐 때 혹은 비행기 아닐떄 */}
      {isLandOwner && buildings.length === 0 && isUnbuildable(landInfo) && (
        <>
          <button className="btn btn-common" onClick={() => setModal(true)}>
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
