import React from 'react';
import TabList from "@/components/Tabs/TabList/TabList";
import Tab from '@/components/Tabs/Tab/Tab';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TabList 컴포넌트', () => {
  afterAll(cleanup);
  
  test('어러개의 Tab을 가져야한다', () => {
    const {getAllByRole} = render(<TabList>
      <Tab active={true} tabId="element1">element1</Tab>
      <Tab active={false} tabId="element2">element2</Tab>
    </TabList>);
    const lists = getAllByRole('tab');
    expect(lists).toHaveLength(2);
  });
});