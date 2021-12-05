import {getThumbnail} from "@/utils/imageUpload";

test('썸네일 추출하기', () => {
  expect(getThumbnail('![](/__mocks__/fileMock.js)'))
    .toBe('/__mocks__/fileMock.js');
});