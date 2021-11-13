import React from 'react';
import TabItem from '@/components/Tabs/TabItem/TabItem';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Tabs 컴포넌트', () => {
  
  afterAll(cleanup);
  
  test('active TabItem 컴포넌트 테스트', () => {
    const onClick = jest.fn();
    const {getByRole} = render(<TabItem active={true} role="게시된 글" onClick={onClick} />);
    const item = getByRole('listitem');
    
    expect(item).toHaveClass('active');
    expect(item).toHaveTextContent('게시된 글');
  });
  
  test('inactive TabItem 컴포넌트 테스트', () => {
    const onClick = jest.fn();
    const {getByRole} = render(<TabItem active={false} role="게시된 글" onClick={onClick} />);
    const item = getByRole('listitem');
    
    expect(item).not.toHaveClass('active');
    expect(item).toHaveTextContent('게시된 글');
  });
  
  test('click 동작 테스트', () => {
    const element = document.createElement('div');
    const onClick = jest.fn(() => element.innerText = '클릭 함수 실행');
    const {getByRole} = render(<TabItem active={false} role="게시된 글" onClick={onClick} />);
    const item = getByRole('listitem');
    
    expect(element.innerText).not.toBe('클릭 함수 실행');
    fireEvent.click(item);
    expect(element.innerText).toBe('클릭 함수 실행');
  });
});