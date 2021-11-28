import React from 'react';
import InpageNavigation from '@/components/InpageNavigation/InpageNavigation';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('InpageNavigation 컴포넌트', () => {
  afterAll(cleanup);
  
  test('내부 링크 테스트', () => {
    const internalLinks = "[" +
      "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
      "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
      "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
      "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-3 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[]}]}]\n";
    const {getAllByRole} = render(<InpageNavigation internalLinks={internalLinks}/>);
    const listItems = getAllByRole('listitem');
    const orderedLists = getAllByRole('list');
    
    expect(orderedLists).toHaveLength(4);
    expect(listItems).toHaveLength(8);
  });
  
  test('내부 링크는 계층 구조를 갖는다', () => {
    const internalLinks = "[" +
      "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
      "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
      "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
      "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-3 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[]}]}]\n";
    const {getByText} = render(<InpageNavigation internalLinks={internalLinks}/>);
    const h3 = getByText('2-1 헤딩');
    const h3Children = h3.nextSibling ! as HTMLOListElement;

    if (h3Children) {
      // [
      // <li><a href='/#2-1-1-%ED%97%A4%EB%94%A9'>2-1-1 헤딩</a></li>,
      // <li>
      //  <a href='/#2-1-2-%ED%97%A4%EB%94%A9'>2-1-2 헤딩</a>
      //  <ol class='links'>
      //    <li><a href='/#2-1-2-1-%ED%97%A4%EB%94%A9'>2-1-2-1 헤딩</a></li>
      //   </ol>
      //  </li>,
      //  <li><a href='/#2-1-3-%ED%97%A4%EB%94%A9'>2-1-3 헤딩</a></li>
      //  ]
      expect(h3Children.children).toHaveLength(3);
      
      if (h3Children.children.length > 0) {
        const grandChildren = h3Children.children[1].querySelector('ol');
        expect(grandChildren?.children).toHaveLength(1);
      }
    }
  });
});