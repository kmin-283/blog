import React from 'react';
import Tabs from '@/components/Tabs/Tabs';
import {
  render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Tabs 컴포넌트', () => {
  const publish = "publish";
  const onClick = jest.fn(() => {
  
  });
  
  test('tabMenu 테스트', () => {
    const {getAllByRole} = render(<Tabs tab={publish} onClick={onClick} />);
    const items = getAllByRole('listitem');
    
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveClass('active');
  });
});