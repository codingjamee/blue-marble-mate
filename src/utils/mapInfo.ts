export type BoardPosition = 'top' | 'right' | 'bottom' | 'left';
export interface NationData {
  id: number;
  name: string;
  type: 'special' | 'city' | 'k-city' | 'airport' | 'goldenKey' | 'fund' | 'start' | 'space';
  price?: number;
  country?: string;
  flag?: string;
}
export type BoardData = Record<BoardPosition, NationData[]>;

const BOARD_DATA: BoardData = {
  top: [
    { id: 0, name: '시작', type: 'start', price: 0, flag: '🏁' },
    {
      id: 1,
      name: '타이페이',
      type: 'city',
      price: 50000,
      flag: '🇹🇼',
    },
    {
      id: 2,
      type: 'goldenKey',
      name: '황금열쇠',
      flag: '🔑',
    },
    {
      id: 3,
      type: 'city',
      name: '홍콩',
      price: 80000,
      flag: '🇭🇰',
    },
    {
      id: 4,
      type: 'city',
      name: '마닐라',
      price: 80000,
      flag: '🇵🇭',
    },
    {
      id: 5,
      type: 'k-city',
      name: '제주도',
      price: 200000,
      country: '대한민국',
      flag: '🇰🇷',
    },
    {
      id: 6,
      type: 'city',
      name: '싱가폴',
      price: 100000,
      flag: '🇸🇬',
    },
    {
      id: 7,
      type: 'goldenKey',
      name: '황금열쇠',
      flag: '🔑',
    },
    {
      id: 8,
      type: 'city',
      name: '카이로',
      flag: '🇪🇬',
      price: 100000,
    },
    {
      id: 9,
      type: 'city',
      name: '이스탄불',
      price: 120000,
      flag: '🇹🇷',
    },
    { id: 10, name: '무인도', type: 'special', price: 0, flag: '🏝️' },

    // {
    //   id: 10,
    //   type: 'space',
    //   name: '우주여행',
    //   price: 200000,
    //   flag: '🚀',
    // },
  ],
  right: [
    {
      id: 11,
      name: '아테네',
      type: 'city',
      price: 14,
      country: '그리스',
      flag: '🇬🇷',
    },
    {
      id: 12,
      type: 'goldenKey',
      name: '황금열쇠',
      flag: '🔑',
    },
    {
      id: 13,
      name: '코펜하겐',
      type: 'city',
      price: 160000,
      country: '덴마크',
      flag: '🇩🇰',
    },
    {
      id: 14,
      name: '스톡홀름',
      type: 'city',
      price: 160000,
      country: '스웨덴',
      flag: '🇸🇪',
    },
    {
      id: 15,
      name: '콩고드여객기',
      type: 'airport',
      price: 200000,
      flag: '✈️',
    },
    {
      id: 16,
      name: '베른',
      type: 'city',
      price: 180000,
      country: '스위스',
      flag: '🇨🇭',
    },
    {
      id: 17,
      type: 'goldenKey',
      name: '황금열쇠',
      flag: '🔑',
    },
    {
      id: 18,
      name: '베를린',
      type: 'city',
      price: 180000,
      country: '독일',
      flag: '🇩🇪',
    },
    {
      id: 19,
      name: '오타와',
      type: 'city',
      price: 200000,
      country: '캐나다',
      flag: '🇨🇦',
    },
  ],
  bottom: [
    {
      id: 20,
      name: '사회복지기금수령',
      type: 'fund',
      price: 0,
      flag: '🤲',
    },
    {
      id: 21,
      name: '부에노스아이레스',
      type: 'city',
      price: 220000,
      country: '아르헨티나',
      flag: '🇦🇷',
    },
    {
      id: 22,
      type: 'goldenKey',
      name: '황금열쇠',
      flag: '🔑',
    },
    {
      id: 23,
      name: '상파울루',
      type: 'city',
      price: 240000,
      country: '브라질',
      flag: '🇸🇬',
    },
    {
      id: 24,
      name: '시드니',
      type: 'city',
      price: 240000,
      country: '호주',
      flag: '🇦🇺',
    },
    {
      id: 25,
      name: '부산',
      type: 'city',
      price: 500000,
      country: '대한민국',
      flag: '🇰🇷',
    },
    {
      id: 26,
      name: '하와이',
      type: 'city',
      price: 260000,
      country: '미국',
      flag: '🇺🇸',
    },
    {
      id: 27,
      name: '리스본',
      type: 'city',
      price: 260000,
      country: '포르투갈',
      flag: '🇵🇹',
    },
    {
      id: 28,
      type: 'airport',
      name: '퀸엘리자베스호',
      flag: '🚢',
    },
    {
      id: 29,
      name: '마드리드',
      type: 'city',
      price: 280000,
      country: '스페인',
      flag: '🇪🇸',
    },
    {
      id: 30,
      name: '우주여행',
      type: 'space',
      price: 0,
      flag: '🚀',
    },
  ],
  left: [
    {
      id: 31,
      name: '도쿄',
      type: 'city',
      price: 300000,
      country: '일본',
      flag: '🇯🇵',
    },
    {
      id: 32,
      name: '콜럼비아호',
      type: 'airport',
      flag: '✈️',
    },
    {
      id: 33,
      name: '파리',
      type: 'city',
      price: 32,
      country: '프랑스',
      flag: '🇫🇷',
    },
    {
      id: 34,
      name: '로마',
      type: 'city',
      price: 32,
      country: '이탈리아',
      flag: '🇮🇹',
    },
    {
      id: 35,
      type: 'goldenKey',
      name: '황금열쇠',
      flag: '🔑',
    },

    {
      id: 36,
      name: '런던',
      type: 'city',
      price: 35,
      country: '영국',
      flag: '🇬🇧',
    },
    {
      id: 37,
      name: '뉴욕',
      type: 'city',
      price: 35,
      country: '미국',
      flag: '🇺🇸',
    },
    { id: 38, name: '사회복지기금', type: 'fund', price: 0, flag: '👼🏻' },
    {
      id: 39,
      name: '서울',
      type: 'k-city',
      price: 1000000,
      country: '대한민국',
      flag: '🇰🇷',
    },
  ],
};

const POSITION_DATA: NationData[] = Object.values(BOARD_DATA).flat();

export { BOARD_DATA, POSITION_DATA };
