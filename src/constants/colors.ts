export type ColorLabel = '빨강' | '초록' | '파랑' | '노랑' | '보라' | '주황';
export type ValueLabel = '#FF0000' | '#00FF00' | '#0000FF' | '#FFFF00' | '#800080' | '#FFA500';

export type ColorOption = {
  label: ColorLabel;
  value: ValueLabel;
};

const colorOptions: ColorOption[] = [
  { label: '빨강', value: '#FF0000' },
  { label: '초록', value: '#00FF00' },
  { label: '파랑', value: '#0000FF' },
  { label: '노랑', value: '#FFFF00' },
  { label: '보라', value: '#800080' },
  { label: '주황', value: '#FFA500' },
];

export { colorOptions };
