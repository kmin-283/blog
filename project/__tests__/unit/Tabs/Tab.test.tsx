import React from 'react';
import Tab from '@/components/Tabs/Tab/Tab';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";

describe('Tab 컴포넌트', () => {
  afterAll(cleanup);
  
  test('active인 경우 active 클래스를 갖는다', () => {
    const {getByRole} = render(<Tab active={true} tabId={"published-tab"}>
      <div>게시된 글</div>
    </Tab>);
    const item = getByRole('tab');
    expect(item).toHaveClass('active');
    expect(item).toHaveTextContent('게시된 글');
  });
  
  test('active가 아닌 경우 active 클래스를 갖지 않는다', () => {
    const {getByRole} = render(<Tab active={false} tabId={"published-tab"}>
      <div>게시된 글</div>
    </Tab>);
    const item = getByRole('tab');
    
    expect(item).not.toHaveClass('active');
    expect(item).toHaveTextContent('게시된 글');
  });
});