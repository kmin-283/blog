import React from 'react';
import Dropdown from "@/components/dropdown/dropdown/dropdown";
import DropdownItem from "@/components/dropdown/dropdownItem/dropdownItem";
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('ContentHeader 컴포넌트', () => {

  const playGround = document.createElement('div');
  const click1st = jest.fn(() => {
    playGround.innerText = '첫 번째 버튼이 클릭되었습니다';
  });
  const click2nd = jest.fn(() => {
    playGround.innerText = '두 번째 버튼이 클릭되었습니다';
  });
  
  test('dropdownIcon 클릭시 DropdownContent 생성', () => {
    const {container} = render(<Dropdown>
      <DropdownItem onClick={click1st} role={'첫 번째 동작'} icon={<span>dummyIcon</span>} />
      <DropdownItem onClick={click2nd} role={'두 번째 동작'} icon={<span>dummyIcon</span>} />
    </Dropdown>);
    const dropdownIcon = container.querySelector('.dropdownIcon')!;
  
    expect(container.querySelector('.dropdownContent')).not.toBeInTheDocument();
    fireEvent.click(dropdownIcon);
    expect(container.querySelector('.dropdownContent')).toBeInTheDocument();
    fireEvent.click(dropdownIcon);
  });
  
  test('dropdownItem 클릭시 함수 동작', () => {
    const {getByText, container} = render(<Dropdown>
      <DropdownItem onClick={click1st} role={'첫 번째 동작'} icon={<span>dummyIcon</span>} />
      <DropdownItem onClick={click2nd} role={'두 번째 동작'} icon={<span>dummyIcon</span>} />
    </Dropdown>);
    const dropdownIcon = container.querySelector('.dropdownIcon')!;
  
    expect(container.querySelector('.dropdownContent')).not.toBeInTheDocument();
    fireEvent.click(dropdownIcon);
    
    const firstItem = getByText('첫 번째 동작');
    fireEvent.click(firstItem);
    expect(playGround.innerText).toBe('첫 번째 버튼이 클릭되었습니다');
    
    const secondItem = getByText('두 번째 동작');
    fireEvent.click(secondItem);
    expect(playGround.innerText).toBe('두 번째 버튼이 클릭되었습니다');
  });
});