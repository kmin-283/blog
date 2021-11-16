import React from 'react';
import Tabs from '@/components/Tabs/Tabs';
import Tab from '@/components/Tabs/Tab/Tab';
import {render, cleanup} from '@testing-library/react';
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";
import TabList from "@/components/Tabs/TabList/TabList";
import '@testing-library/jest-dom/extend-expect';

describe('Tabs 컴포넌트', () => {
  afterAll(cleanup);
  test('tabList를 가져야 한다', () => {
    const {getByRole} = render(<Tabs>
      <TabList>
        <Tab tabId={"published"} active={true}>게시된 글</Tab>
        <Tab tabId={"drafted"} active={false}>임시 저장 글</Tab>
      </TabList>
      <TabPanel tabId={"published"} isHidden={false}>
        <p>게시된 글 입니다</p>
      </TabPanel>
      <TabPanel tabId={"drafted"} isHidden={true}>
        <p>임시 저장 글 입니다</p>
      </TabPanel>
    </Tabs>);

    const tabList = getByRole('tablist');
    expect(tabList).toBeInTheDocument();
  });

  test('tabPanel을 가져야 한다', () => {
    const {getAllByRole} = render(
      <Tabs>
        <TabList>
          <Tab tabId={"published"} active={true}>게시된 글</Tab>
          <Tab tabId={"drafted"} active={false}>임시 저장 글</Tab>
          <Tab tabId={"tested"} active={false}>테스트 글</Tab>
        </TabList>
        <TabPanel tabId={"published"} isHidden={false}>
          <p>게시된 글 내용입니다</p>
        </TabPanel>
        <TabPanel tabId={"drafted"} isHidden={true}>
          <p>임시 저장 글 내용입니다</p>
        </TabPanel>
        <TabPanel tabId={"tested"} isHidden={true}>
          <p>테스트 글 내용입니다</p>
        </TabPanel>
      </Tabs>);

    // isHidden=true인 tabPanel은 보이지 않으므로 길이는 1이 된다.
    const tabPanels = getAllByRole('tabpanel');
    expect(tabPanels).toHaveLength(1);
    expect(tabPanels[0]).toBeInTheDocument();
  });
});