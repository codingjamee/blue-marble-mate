import { useEffect, useState } from 'react';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import usePlayStore from '../../../stores/gamePlayStore';
import { BuildingRentType } from '../../../utils/mapType';
import playerStore from '../../../stores/playerStore';
import landStore from '../../../stores/landStore';
import BuildingSelect from './BuildingButton';
import GameActionControls from './GameActionControls';
import SpaceJumpSelector from './SpaceJumpSelector';

const GameControl = () => {
  const [modal, setModal] = useState(false);
  const currentPlayer = playerStore.getState().getNowTurn();
  const [spaceModal, setSpaceModal] = useState(false);
  const [warpPosition, setPosition] = useState(currentPlayer.position.id);
  const [building, setBuilding] = useState<Exclude<BuildingRentType, 'land'>>('villa1');
  const handleUserAction = usePlayStore((state) => state.handleUserAction);
  const landInfo = landStore.getState().getLandInfo(currentPlayer.position.id)!;
  const canControl = usePlayStore.getState().diceIsRolled;
  const ownerAndRent = landStore
    .getState()
    .getLandOwnerAndRent(currentPlayer.position.id, currentPlayer.id);
  const ownerLand = landInfo && landInfo.type === 'city';
  const isCurrentPlayerOwner = ownerLand && ownerAndRent.isCurrentPlayerOwner;

  const buildings = landStore.getState().getAvailableBuildings(currentPlayer.position.id);

  useEffect(() => {
    currentPlayer.position.name === '우주여행' && setSpaceModal(true);
  }, [currentPlayer.position.name]);

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
                {ownerLand && landInfo.owner && (
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
          {spaceModal && (
            <ConfirmModal
              setModal={setModal}
              onConfirm={() => {
                if (warpPosition === currentPlayer.position.id)
                  return console.log('이동할 위치를 선택해주세요');
                handleUserAction('SPACE_MOVE', undefined, warpPosition);
                setSpaceModal(false);
              }}
              noCancel={true}
            >
              <h2>이동할 위치 선택</h2>
              <SpaceJumpSelector setPosition={setPosition} />
            </ConfirmModal>
          )}
        </section>
      )}
    </>
  );
};
export default GameControl;
