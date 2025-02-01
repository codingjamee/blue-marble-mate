import { useState } from 'react';
import landStore from '../../../stores/landStore';
import playerStore from '../../../stores/playerStore';
import usePayment from './usePayment';
import { LandType, NationType } from '../../../utils/mapType';

interface OwnershipAction {
  type: 'BUY_LAND' | 'BUILD' | 'PAY_RENT' | 'NONE';
  owner: string | null;
  price?: number;
  rentPrice?: number;
}

const useLandOwnership = () => {
  const [ownershipAction, setOwnershipAction] = useState<OwnershipAction | null>(null);
  const { getLandInfo, updateLandOwner } = landStore();
  const { getNowTurn } = playerStore();
  const { handlePayment } = usePayment();

  const checkLandOwner = async (position: LandType): Promise<void> => {
    const currentPlayer = getNowTurn();
    const landInfo = getLandInfo(position.id);

    return new Promise((resolve) => {
      if (!landInfo) {
        console.error('Land info not found');
        resolve();
        return;
      }

      // 땅 주인이 없는 경우
      if (!landInfo.owner) {
        setOwnershipAction({
          type: 'BUY_LAND',
          owner: null,
          price: position.price,
        });

        // 구매 결정을 기다림
        const handleBuy = () => {
          handlePayment(currentPlayer.id, -position.price);
          updateLandOwner(position.id, currentPlayer.id);
          setOwnershipAction(null);
          resolve();
        };

        const handleSkip = () => {
          setOwnershipAction(null);
          resolve();
        };

        // 구매 여부를 묻는 UI 표시 (별도의 모달이나 컴포넌트로 구현)
        // 구매하면 handleBuy, 건너뛰면 handleSkip 호출
        return;
      }

      // 현재 플레이어가 땅 주인인 경우
      if (landInfo.owner === currentPlayer.id) {
        setOwnershipAction({
          type: 'BUILD',
          owner: landInfo.owner,
          price: position.buildingPrice,
        });

        // 건설 결정을 기다림
        const handleBuild = () => {
          handlePayment(currentPlayer.id, -position.buildingPrice);
          // 건물 건설 로직 추가
          setOwnershipAction(null);
          resolve();
        };

        const handleSkip = () => {
          setOwnershipAction(null);
          resolve();
        };

        // 건설 여부를 묻는 UI 표시
        // 건설하면 handleBuild, 건너뛰면 handleSkip 호출
        return;
      }

      // 다른 플레이어의 땅인 경우
      if (landInfo.owner !== currentPlayer.id) {
        const rentPrice = calculateRentPrice(landInfo, position);
        setOwnershipAction({
          type: 'PAY_RENT',
          owner: landInfo.owner,
          rentPrice,
        });

        // 자동으로 통행료 지불
        handlePayment(currentPlayer.id, -rentPrice);
        handlePayment(landInfo.owner, rentPrice);

        setTimeout(() => {
          setOwnershipAction(null);
          resolve();
        }, 1500); // 통행료 지불 애니메이션을 위한 딜레이
        return;
      }

      resolve();
    });
  };
};

export default useLandOwnership;
