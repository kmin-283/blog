import React from 'react';
import Tabs from '@/components/Tabs/Tabs';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TabItem from "@/components/Tabs/TabItem/TabItem";
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";

describe('Tabs 컴포넌트', () => {
  test('tabs 테스트', () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    const {getAllByRole} = render(<Tabs>
      <TabItem active={true} onClick={onClick1}>
        <TabPanel labelledBy="게시된 글"/>
      </TabItem>
      <TabItem active={false} onClick={onClick2}>
        <TabPanel labelledBy="임시저장 글"/>
      </TabItem>
    </Tabs>);
    const items = getAllByRole('listitem');
    
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveClass('active');
  });
});