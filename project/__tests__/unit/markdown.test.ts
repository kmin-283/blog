import {markedString, makeInternalLinks} from '@/utils/markdown';

test('마크다운 형식의 문자열 만들기', () => {
  expect(markedString('# h1입니다')).toBe('<h1 id=h1%EC%9E%85%EB%8B%88%EB%8B%A4>h1입니다</h1>');
  expect(markedString('![img](/__mocks__/fileMock.js "목업 이미지")'))
    .toBe("<p><img src=\"/__mocks__/fileMock.js\" alt=\"img\" title=\"목업 이미지\"></p>\n");
});

describe('마크다운 내부에 있는 헤딩 찾기',()=>{
  
  test('#개수가 1~6인 경우 정상적인 헤딩1', () => {
    expect(makeInternalLinks(
      '## 1 헤딩\n' +
      '\n' +
      '![사진이 없나요?](/test/test.jpg "사진이 없음")\n' +
      '\n' +
      '## 2 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '\n' +
      '### 2-1 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '#### 2-1-1 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '#### 2-1-2 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '##### 2-1-2-1 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '### 2-2 헤딩\n' +
      '쓸 말이 딱히 없네요\n' +
      '#### 2-2-1 헤딩')).toBe("[" +
      "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
      "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
      "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
      "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}]}," +
      "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[" +
      "{\"headingLevel\":4,\"value\":\"2-2-1 헤딩\",\"child\":[]}]}]}]"
    );
  });
  
  test('#개수가 1~6인 경우 정상적인 헤딩2', () => {
    expect(makeInternalLinks(
      '## 1 헤딩\n' +
      '\n' +
      '![사진이 없나요?](/test/test.jpg "사진이 없음")\n' +
      '\n' +
      '## 2 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '\n' +
      '### 2-1 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '#### 2-1-1 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '#### 2-1-2 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '##### 2-1-2-1 헤딩\n' +
      '테스트 포스트입니다~\n' +
      '#### 2-1-3 헤딩\n' +
      '쓸 말이 딱히 없네요\n' +
      '### 2-2 헤딩')).toBe("[" +
      "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
      "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
      "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
      "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-3 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[]}]}]"
    );
  });
  
  test('#개수가 6개를 초과하면 헤딩이 아닙니다', () => {
    expect(makeInternalLinks('####### 헤딩이 아닌 문장\n' +
      '헤딩이 아닌 문장 #######')).toBe('[]');
  });
});