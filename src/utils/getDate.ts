import { Dayjs } from 'dayjs';
const getFormatDate = (date: Dayjs) => {
  return date.format('YYYY년 MM월 DD일');
};

export { getFormatDate };
