import {markedString, makeInternalLinks} from '@/utils/markdown';

test('마크다운 형식의 문자열 만들기', () => {
  expect(markedString('# h1입니다')).toBe('<h1 id=\"h1입니다\">h1입니다</h1>\n');
  expect(markedString('![img](/__mocks/fileMock.js "목업 이미지")'))
    .toBe("<p><img src=\"/__mocks/fileMock.js\" alt=\"img\" title=\"목업 이미지\"></p>\n");
});

describe('마크다운 내부에 있는 헤딩 찾기',()=>{
  
  test('#개수가 1~6인 경우 정상적인 헤딩', () => {
    expect(makeInternalLinks('# 첫 번째 헤딩\n' +
      '\n' +
      '![사진이 없나요?](/test/test.jpg "사진이 없음")\n' +
      '\n' +
      '## 두 번째 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '\n' +
      '쓸 말이 딱히 없네요\n' +
      '###### 마지막 헤딩')).toStrictEqual(['첫-번째-헤딩', '두-번째-헤딩', '마지막-헤딩']);
  });
  
  test('#개수가 6개를 초과하면 헤딩이 아닙니다', () => {
    expect(makeInternalLinks('####### 헤딩이 아닌 문장\n' +
      '#### 헤딩인 문장\n' +
      '헤딩이 아닌 문장 #######')).toStrictEqual(['헤딩인-문장']);
  });
});