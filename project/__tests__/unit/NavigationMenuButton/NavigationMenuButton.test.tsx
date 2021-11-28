import React from 'react';
import NavigationMenuButton from '@/components/NavigationMenuButton/NavigationMenuButton';
import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('InpageNavigation 컴포넌트', () => {
  afterAll(cleanup);
  
  test('클릭 이전엔 항목이 보이지 않는다', () => {
    const internalLinks = "[" +
      "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
      "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
      "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
      "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-3 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[]}]}]\n";
    render(<NavigationMenuButton internalLinks={internalLinks} />);
    
    expect(screen.queryByRole('ol')).not.toBeInTheDocument();
  });
  
  test('클릭 이후 항목이 보여야 한다', () => {
    const internalLinks = "[" +
      "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
      "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
      "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
      "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":4,\"value\":\"2-1-3 헤딩\",\"child\":[]}]}," +
      "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[]}]}]\n";
    const {getByRole} = render(<NavigationMenuButton internalLinks={internalLinks} />);
    const btn = getByRole('button');
    
    fireEvent.click(btn);
    
    const menu = getByRole('menu');
    
    expect(menu).toBeInTheDocument();
    expect(menu.children).toHaveLength(2);
  });
});