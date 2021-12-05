import  {convertToKRDate} from '@/utils/time';

test('Date 한글로 변경', ()=>{
  const now = new Date('1995-12-17T03:24:00Z').toISOString();
  expect(convertToKRDate(now)).toBe('1995년 12월 17일');
});