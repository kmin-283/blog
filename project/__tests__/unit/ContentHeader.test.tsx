import React from 'react';
import ContentHeader from "@/components/ContentHeader/ContentHeader";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('ContentHeader 컴포넌트', () => {
  const internalLinks = ['첫 번째 헤딩', '두 번째 헤딩', '세 번째 헤딩'];
  const {getAllByRole} = render(<ContentHeader internalLinks={internalLinks}/>);
  
  test('내부 링크 테스트', () => {
    const items = getAllByRole('listitem');
    items.map((item, index) => expect(item.textContent)
      .toBe(`[${index+1}. ${internalLinks[index]}](#${internalLinks[index]})\n`));
  });
});