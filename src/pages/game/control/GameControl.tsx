import { useState } from 'react';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import usePlayStore from '../../../stores/gamePlayStore';
import { BuildingRentType } from '../../../utils/mapType';
import playerStore from '../../../stores/playerStore';
import landStore from '../../../stores/landStore';
import BuildingSelect from './BuildingButton';
import GameActionControls from './GameActionControls';

const GameControl = () => {
  const handleUserAction = usePlayStore((state) => state.handleUserAction);
  const currentPlayer = playerStore.getState().getNowTurn();
  const landInfo = landStore.getState().getLandInfo(currentPlayer.position.id);
  const canControl = usePlayStore.getState().diceIsRolled;
  const ownerAndRent = landStore
    .getState()
    .getLandOwnerAndRent(currentPlayer.position.id, currentPlayer.id);
  const ownerLand = landInfo && landInfo.type === 'city';
  const isCurrentPlayerOwner = ownerLand && ownerAndRent.isCurrentPlayerOwner;

  const [modal, setModal] = useState(false);
  const [building, setBuilding] = useState<Exclude<BuildingRentType, 'land'>>('villa1');
  const buildings = landStore.getState().getAvailableBuildings(currentPlayer.position.id);

  return (
    <>
      {canControl && (
        <section className="console-container">
          <div className="building">
            <h3>위치 정보 및 게임 컨트롤</h3>
            {landInfo && (landInfo.type === 'city' || landInfo.type === 'space') && (
              <section className="des-section">
                <div className="des">
                  <div>{landInfo.name} 소유주:</div>
                  <div className="owner">{ownerAndRent.ownerName || '없음'}</div>
                </div>
                {landInfo.owner && (
                  <>
                    <div className="des staus">
                      <div>건물 상태:</div>
                      <div>
                        {landInfo.buildings.length > 0 ? landInfo.buildings.join(', ') : '건물없음'}
                      </div>
                    </div>
                    {
                      <div className="des">
                        <div>통행료: </div>
                        <div className="tolls">₩ {ownerAndRent.rentPrice}</div>
                      </div>
                    }
                  </>
                )}
              </section>
            )}
            <GameActionControls
              onAction={handleUserAction}
              onBuildingPurchase={() => setModal(true)}
              isLandOwner={isCurrentPlayerOwner}
              // hasOwner={landInfo ? landInfo.owner : null}
              canSkipTurn={currentPlayer.canSkipTurn && !currentPlayer.doubleTurnLeft}
              landType={landInfo?.type}
              landInfo={landInfo}
            />
          </div>
          {modal && (
            <ConfirmModal setModal={setModal} onConfirm={() => handleUserAction('BUILD', building)}>
              <h2>매입할 건물 선택</h2>
              <BuildingSelect buildings={buildings} setBuilding={setBuilding} />
            </ConfirmModal>
          )}
        </section>
      )}
    </>
  );
};
export default GameControl;
