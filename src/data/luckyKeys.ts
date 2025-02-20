import { BuildingCost, LuckyKey } from './luckyKeysType';

const BUILDING_REPAIR_COSTS: BuildingCost = {
  HOTEL: 100000,
  BUILDING: 60000,
  VILLA: 30000,
};

const BUILDING_SECURITY_COSTS: BuildingCost = {
  HOTEL: 50000,
  BUILDING: 30000,
  VILLA: 10000,
};

const BUILDING_TAXS: BuildingCost = {
  HOTEL: 150000,
  BUILDING: 100000,
  VILLA: 30000,
};

const LUCKY_KEYS: LuckyKey[] = [
  {
    id: 0,
    name: '병원비 지불',
    contents: '병원비 5만원을 은행에 납부합니다.',
    action: { type: 'PAY', amount: 50000 },
  },
  {
    id: 1,
    name: '복권 당첨',
    contents: '축하합니다 복권에 당첨되었습니다.\n 당첨금 20만원을 은행에서 받습니다.',
    action: { type: 'RECEIVE', amount: 200000 },
  },
  {
    //보관 해야함
    id: 2,
    name: '특수 무전기',
    contents:
      'A) 무인도에 갇혀있을 때 사용할 수 있습니다. \n B) 1회 사용 후 반납합니다 \n C) 타인에게 팔 수 있습니다.(20만원) ',
    action: { type: 'ESCAPE', itemPrice: 200000 },
    keepable: true,
  },
  {
    id: 3,
    name: '무인도',
    contents: '폭풍을 만났습니다. 무인도로 곧장 가세요',
    action: { type: 'MOVE', destination: '무인도' },
  },
  {
    id: 4,
    name: '파티 초대권',
    contents:
      '대중 앞에서 장기자랑을 하세요 \n A) 다른 게임 참가자들이 정한 상금을 은행에서 받습니다. \n (지금은 10만원 고정)',
    action: { type: 'RECEIVE', amount: 100000 },
  },
  {
    id: 5,
    name: '관광 여행',
    contents:
      '제주로 가세요 \n A) 제주를 상대방이 가지고 있을 경우, 통행료를 지불합니다. \n B) 출발지를 지나갈 경우, 월급을 받습니다.',
    action: {
      type: 'MOVE_WITH_PAYMENT',
      destination: '제주도',
      payment: {
        paymentProperty: {
          rentLandName: '제주도',
          useRentPrice: true,
        },
      },
      checkPassStart: true,
    },
  },
  {
    id: 6,
    name: '과속운전 벌금',
    contents: '과속운전을 하였습니다. \n A) 범칙금 5만원을 은행에 납부합니다.',
    action: { type: 'PAY', amount: 50000 },
  },
  {
    id: 7,
    name: '해외 유학',
    contents: '학교에 등록금을 내세요. \n A) 등록금 10만원을 은행에 납부합니다.',
    action: { type: 'PAY', amount: 100000 },
  },
  {
    id: 8,
    name: '연금 혜택',
    contents: '노후 연금을 받으세요',
    action: { type: 'RECEIVE', amount: 50000 },
  },
  {
    id: 9,
    name: '이사',
    contents: '뒤로 세칸 옮기세요',
    action: { type: 'MOVE', destination: -3 },
  },
  {
    id: 10,
    name: '고속도로',
    contents: '출발지까지 곧바로 가세요',
    action: { type: 'MOVE', destination: '시작' },
  },
  {
    id: 11,
    name: '우승',
    contents: '자동차 경주에서 챔피언이 되었습니다. \n A) 상금 10만원을 은행에서 받습니다.',
    action: { type: 'RECEIVE', amount: 100000 },
  },
  {
    //보관 가능해야 함
    id: 12,
    name: '우대권',
    contents:
      '상대방이 소유한 장소에 통행료 없이 머무를 수 있습니다. \n A) 1회 사용 후, 황금열쇠함에 반납합니다. \n B) 중요한 순간에 쓰세요. ',
    action: { type: 'FREE_PASS' },
    keepable: true,
  },
  {
    id: 13,
    name: '항공여행',
    contents:
      '콩고드 여객기를 타고 "타이베이"로 가세요. \n A) 콩고드 여객기를 상대방이 가지고 있을 경우 탑승료 (30만원)을 지불합니다. \n B) 출발지를 지나갈 경우, 월급을 받습니다.',
    action: {
      type: 'MOVE_WITH_PAYMENT',
      destination: '타이베이',
      payment: {
        paymentProperty: { rentLandName: '콩고드 여객기', useRentPrice: true },
      },
      checkPassStart: true,
    },
  },
  {
    id: 14,
    name: '건물 수리비',
    contents:
      '정기적으로 건물을 수리하여야 합니다. \n (각 건물별로 다음과 같이 은행에 지불합니다.) \n 호텔 (HOTEL) ---- 10만원 \n 빌딩(BUILDING) ---- 6만원 \n 별장(VILLA) ---- 3만원',
    action: {
      type: 'BUILDING_PAYMENT',
      costs: BUILDING_REPAIR_COSTS,
    },
  },
  {
    id: 15,
    name: '방범비',
    contents:
      '방범비를 각 건물별로 다음과 같이 은행에 지불하세요. \n 호텔 (HOTEL) ---- 5만원 \n 빌딩(BUILDING) ---- 3만원 \n 별장(VILLA) ---- 1만원',
    action: {
      type: 'BUILDING_PAYMENT',
      costs: BUILDING_SECURITY_COSTS,
    },
  },
  {
    id: 16,
    name: '유람선 여행',
    contents:
      "퀸 엘리자베스 호를 타고 '베이징'으로 가세요. \n A) 퀸 엘리자베스호를 상대방이 가지고 있을 경우, 탑승료 (25만원)을 지불합니다. \n B) 출발지를 지나갈 경우, 월급을 받습니다.",
    action: {
      type: 'MOVE_WITH_PAYMENT',
      destination: '베이징',
      payment: {
        paymentProperty: { rentLandName: '퀸엘리자베스호', useRentPrice: true },
      },
      checkPassStart: true,
    },
  },
  {
    id: 17,
    name: '부산으로 가세요',
    contents:
      'A) 부산을 상대방이 가지고 있을 경우, 통행료를 지불합니다. \n B) 출발지를 지나갈 경우, 월급을 받습니다.',
    action: {
      type: 'MOVE_WITH_PAYMENT',
      destination: '부산',
      payment: {
        paymentProperty: { rentLandName: '퀸엘리자베스호', useRentPrice: true },
      },
      checkPassStart: true,
    },
  },
  {
    id: 18,
    name: '생일 축하',
    contents: '전원에게 축하금 1만원씩 받습니다. (지금은 은행에서 4만원 받기 고정)',
    action: {
      type: 'RECEIVE',
      amount: 40000,
    },
  },
  {
    id: 19,
    name: '장학금 혜택',
    contents: '장학금을 받으세요 \n A) 장학금 10만원을 은행에서 받습니다.',
    action: {
      type: 'RECEIVE',
      amount: 100000,
    },
  },
  {
    id: 20,
    name: '종합 소득세',
    contents:
      '종합소득세를 각 건물별로 아래와 같이 은행에 납부하세요 \n 호텔 ---- 15만원 \n 빌딩 ---- 10만원 \n 별장 ---- 3만원',
    action: {
      type: 'BUILDING_PAYMENT',
      costs: BUILDING_TAXS,
    },
  },
  {
    id: 21,
    name: '노벨 평화상',
    contents: '당신은 세계 평화를 위하여 공헌하였습니다. \n A) 수상금 30만원을 은행에서 받습니다.',
    action: {
      type: 'RECEIVE',
      amount: 300000,
    },
  },
  {
    id: 22,
    name: '반액 대매출',
    contents: '당신의 부동산 중에서 가장 비싼 곳을 반액으로 은행에 파세요',
    action: {
      type: 'SELL_BUILDING',
    },
  },
  {
    id: 23,
    name: '우주여행 초청장',
    contents:
      '우주 항공국에서 초청장이 왔습니다.(우주정류장으로 가세요) \n A) 무료이므로 컬럼비아호에 탑승료를 지불하지 않습니다. \n 출발지를 지나갈 경우, 월급을 받습니다.',
    action: {
      type: 'MOVE_WITH_PAYMENT',
      destination: '우주여행',
      payment: {
        paymentProperty: { rentLandName: '컬럼비아호', useRentPrice: false }, //무료
      },
      checkPassStart: true,
    },
  },
  {
    id: 24,
    name: '우대권',
    contents:
      '상대방이 소유한 장소에 통행료 없이 머무를 수 있습니다. \n A) 1회 사용 후, 황금열쇠함에 반납합니다. \n B) 중요한 순간에 쓰세요.',
    action: {
      type: 'FREE_PASS',
    },
    keepable: true,
  },
  {
    id: 25,
    name: '세계일주 초대권',
    contents:
      '축하합니다. \n 현재 위치에서부터 한 바퀴 돌아오세요. \n A) 다른 곳으로 갈 수 없습니다. \n B) 출발지를 지나가면서 월급을 받습니다. \n C) 사회복지기금을 지나가면서 모아놓은 기금을 받습니다.',
    action: {
      type: 'WORLD_TOUR',
      collectFund: true,
      collectSalary: true,
    },
  },
  {
    id: 26,
    name: '이사',
    contents: '뒤로 두칸 옮기세요',
    action: { type: 'MOVE', destination: -2 },
  },
  {
    id: 27,
    name: '사회복지기금 배당',
    contents: '사회복지기금 접수처로 가세요. \n 출발지를 지나갈 경우, 월급을 받습니다.',
    action: {
      type: 'MOVE',
      destination: '사회복지기금',
      checkPassStart: true,
    },
  },
  {
    id: 28,
    name: '반액대매출',
    contents:
      '당신의 부동산 중에서 가장 비싼 곳을 \n 반액으로 은행에 파세요. \n A) 건물이 지어진 경우, 반액으로 함께 처분합니다.',
    action: { type: 'SELL_BUILDING' },
  },
];

export { LUCKY_KEYS };
