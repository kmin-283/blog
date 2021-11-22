import React from 'react';
import InpageNavigation from "@/components/InpageNavigation/InpageNavigation";
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('InpageNavigation 컴포넌트', () => {
  afterAll(cleanup);
  
  test('내부 링크 테스트', () => {
    const internalLinks = ['첫 번째 헤딩', '두 번째 헤딩', '세 번째 헤딩'];
    const {getAllByRole} = render(<InpageNavigation internalLinks={internalLinks}/>);
    const items = getAllByRole('listitem');
    items.map((item, index) => expect(item.textContent)
      .toBe(`[${index+1}. ${internalLinks[index]}](#${internalLinks[index]})\n`));
  });
  
  test('', () => {});
});