/**
 * 
 * FRONT OR BACK 선택필요
 * 진행률 = (주요 요소들의 가중 평균)

- 바퀴 수 기준: 40% 반영
  - 예: 4바퀴를 완주 기준으로 잡았을 때, 2바퀴 돌았다면 50%
  
- 건물 발전도: 30% 반영
  - 전체 구매 가능 부지 중 구매/건설된 비율
  - 예: 총 28개 구역 중 14개 개발 시 50%
  
- 자금 보유량: 30% 반영
  - 시작 금액 대비 현재 전체 자산(현금 + 부동산) 비율
  - 예: 시작금액 대비 200% 성장 시 100% 계산
 */

export const calculateProgress = (turns, properties, assets) => {
  const turnProgress = (turns / 4) * 0.4; // 바퀴 수 가중치 40%
  const propertyProgress = (properties / 28) * 0.3; // 건물 가중치 30%
  const assetProgress = Math.min(assets / startingMoney, 2) * 0.3; // 자산 가중치 30%

  return Math.floor((turnProgress + propertyProgress + assetProgress) * 100);
};