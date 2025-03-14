type KeyType = 'adjective' | 'onomatopoeia' | 'animal';
export type NameRandom = Record<KeyType, string[]>;
const nameRandom: NameRandom = {
  onomatopoeia: [
    '퐁퐁퐁',
    '휙휙휙',
    '샤샤샤',
    '번쩍번쩍',
    '쿵쿵쿵',
    '팡팡팡',
    '휘리릭',
    '슝슝슝',
    '철컥철컥',
    '탭탭탭',
    '딸깍딸깍',
    '와구와구',
    '솔솔솔',
    '쏙쏙쏙',
    '짜잔짜잔',
    '휘황찬란',
    '펑펑펑',
    '샤라랑',
    '뿅뿅뿅',
    '삐링삐링',
    '뿌잉뿌잉',
    '챙챙챙',
    '띵띵띵',
    '쿠와앙',
    '반짝반짝',
    '부르르룩',
    '팡파르르',
    '샤라샤라',
    '둥실둥실',
    '깡총깡총',
    '꿈틀꿈틀',
    '반짝반짝',
    '뒤뚱뒤뚱',
    '폴짝폴짝',
    '아장아장',
    '갸우뚱갸우뚱',
    '꾸벅꾸벅',
    '낭창거리',
    '너울거리',
    '데굴데굴',
    '돌랑돌랑',
    '둥실둥실',
    '몽실몽실',
    '물끄러미',
    '반들반들',
    '보슬보슬',
    '비틀비틀',
    '살랑살랑',
    '싱글벙글',
    '부룩부룩',
    '엉금엉금',
    '울랑울랑',
    '절뚝절뚝',
    '주르르륵',
    '찰랑찰랑',
    '통통통통',
    '흔들흔들',
    '달랑달랑',
    '쓱싹쓱싹',
  ],
  adjective: [
    '춤을 추는',
    '잠을 자는',
    '책을 읽는',
    '노래하는',
    '달리는',
    '웃고 있는',
    '울고 있는',
    '공부하는',
    '그림 그리는',
    '밥을 먹는',
    '물장구치는',
    '수영하는',
    '점프하는',
    '날아가는',
    '헤엄치는',
    '쳐다보는',
    '엎드려 있는',
    '누워있는',
    '앉아있는',
    '서있는',
    '걸어가는',
    '뛰어가는',
    '기어가는',
    '헤매는',
    '숨어있는',
    '찾아다니는',
    '구르는',
    '돌아다니는',
    '머무르는',
    '떠다니는',
    '날아다니는',
    '춤추는',
    '노래부르는',
    '잠자는',
    '꿈꾸는',
    '상상하는',
    '생각하는',
    '고민하는',
    '걱정하는',
    '기뻐하는',
    '슬퍼하는',
    '화내는',
    '싸우는',
    '놀라는',
    '당황하는',
    '어리둥절한',
    '신나하는',
    '즐거워하는',
    '행복해하는',
    '우울해하는',
    '심심해하는',
    '바빠하는',
    '여유로운',
    '피곤해하는',
    '졸린',
    '배고픈',
    '목마른',
    '배부른',
    '지친',
    '활기찬',
    '건강한',
    '아픈',
    '힘든',
    '편안한',
    '불편한',
    '궁금해하는',
    '호기심많은',
    '똑똑한',
    '현명한',
    '어리석은',
    '귀여운',
    '멋진',
    '예쁜',
    '못생긴',
    '착한',
    '부지런한',
    '조용한',
    '깔끔한',
    '단정한',
    '헝클어진',
    '뒹굴뒹굴 구르는',
    '마른',
    '따뜻한',
    '차가운',
    '전략적인',
    '노련한',
    '숙련된',
    '신중한',
    '빠른',
    '정교한',
    '강력한',
    '능숙한',
    '베테랑',
    '초보',
    '공격적인',
    '방어적인',
    '대담한',
    '신중한',
    '침착한',
    '예측불가한',
    '치밀한',
    '과감한',
    '도전적인',
    '창의적인',
    '전설의',
    '미스터리한',
    '화려한',
    '평화로운',
    '용감한',
    '대담한',
    '신비로운',
    '카리스마있는',
    '열정적인',
    '비밀스러운',
    '협동적인',
    '리더십있는',
    '믿음직한',
    '든든한',
    '배려있는',
    '승부욕있는',
    '불굴의',
    '불패의',
    '최강의',
    '투혼의',
    '수호자',
    '정찰병',
    '지원가',
    '공격수',
    '궁수',
    '마법사',
    '전사',
    '힐러',
    '탱커',
    '암살자',
  ],
  animal: [
    '강아지',
    '고양이',
    '토끼',
    '햄스터',
    '기니피그',
    '팬더',
    '코알라',
    '캥거루',
    '다람쥐',
    '사자',
    '호랑이',
    '표범',
    '치타',
    '하이에나',
    '늑대',
    '여우',
    '곰',
    '북극곰',
    '반달곰',
    '판다',
    '코끼리',
    '기린',
    '하마',
    '코뿔소',
    '얼룩말',
    '당나귀',
    '말',
    '염소',
    '양',
    '소',
    '돼지',
    '멧돼지',
    '수달',
    '비버',
    '두더지',
    '고슴도치',
    '족제비',
    '스컹크',
    '너구리',
    '라쿤',
    '원숭이',
    '침팬지',
    '고릴라',
    '오랑우탄',
    '나무늘보',
    '캥거루',
    '주머니쥐',
    '타조',
    '펭귄',
    '부엉이',
    '올빼미',
    '독수리',
    '매',
    '콘도르',
    '앵무새',
    '카나리아',
    '참새',
    '까치',
    '까마귀',
    '비둘기',
    '공작',
    '물오리',
    '백조',
    '황새',
    '두루미',
    '플라밍고',
    '악어',
    '도마뱀',
    '이구아나',
    '카멜레온',
    '뱀',
    '코브라',
    '아나콘다',
    '거북이',
    '바다거북',
    '개구리',
    '두꺼비',
    '도롱뇽',
    '도룡뇽',
    '맹꽁이',
    '청개구리',
    '금붕어',
    '잉어',
    '상어',
    '고래',
    '돌고래',
    '가오리',
    '문어',
    '오징어',
    '낙지',
    '해파리',
    '불가사리',
    '게',
    '랍스터',
    '새우',
    '가재',
    '조개',
    '굴',
    '전복',
    '소라',
    '달팽이',
    '민달팽이',
    '지렁이',
    '애벌레',
    '나비',
    '나방',
    '무당벌레',
    '개미',
    '꿀벌',
    '말벌',
  ],
};

const gameRandom: string[] = [
  '신나는',
  '두근두근',
  '즐거운',
  '재미있는',
  '달콤한',
  '행복한',
  '희망찬',
  '씩씩한',
  '따뜻한',
  '포근한',
  '반짝이는',
  '아기자기한',
  '사랑스러운',
  '귀여운',
  '예쁜',
  '꿈같은',
  '설레는',
  '상쾌한',
  '활기찬',
  '기분좋은',
  '밝은',
  '환한',
  '달달한',
  '폭신폭신한',
  '새콤달콤한',
  '보드라운',
  '동그란',
  '깔끔한',
  '아름다운',
  '산뜻한',
  '고운',
  '맑은',
  '순수한',
  '깨끗한',
  '푸른',
  '하얀',
  '노란',
  '분홍빛',
  '보라빛',
  '초록빛',
  '하늘빛',
  '무지개빛',
  '햇살같은',
  '꽃같은',
  '구름같은',
  '별같은',
  '달님같은',
  '솜사탕같은',
  '사탕같은',
  '젤리같은',
  '쿠키같은',
  '케이크같은',
  '아이스크림같은',
  '초콜릿같은',
  '캔디같은',
  '레몬같은',
  '딸기같은',
  '바나나같은',
  '오렌지같은',
  '포도같은',
  '수박같은',
  '사과같은',
  '복숭아같은',
  '멜론같은',
  '파인애플같은',
  '블루베리같은',
  '체리같은',
  '키위같은',
  '망고같은',
  '라즈베리같은',
  '자두같은',
  '귤같은',
  '배같은',
  '유쾌한',
  '신기한',
  '멋진',
  '훌륭한',
  '착한',
  '똑똑한',
  '슬기로운',
  '튼튼한',
  '건강한',
  '친절한',
  '정직한',
  '열심히하는',
  '용감한',
  '꾸준한',
  '성실한',
  '믿음직한',
  '소중한',
  '특별한',
  '완벽한',
  '멋있는',
  '우아한',
  '화사한',
  '싱그러운',
  '상쾌한',
  '깜찍한',
  '재치있는',
  '영리한',
  '소담스러운',
  '싹싹한',
  '다정한',
  '착실한',
];

export { nameRandom, gameRandom };
