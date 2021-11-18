import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tabs  from '@/components/Tabs/Tabs';
import TabList from "@/components/Tabs/TabList/TabList";
import Tab from "@/components/Tabs/Tab/Tab";
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";

export default {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
} as Meta;

const Template: Story = () => {
  return (<Tabs tabIds={['published', 'drafted', 'tested']}>
    <TabList>
      <Tab>게시된 글</Tab>
      <Tab>임시 저장 글</Tab>
      <Tab>테스트 글</Tab>
    </TabList>
    <TabPanel>
      <p>게시된 글 입니다</p>
    </TabPanel>
    <TabPanel>
      <ul>
        <li>임시 저장 글 1 입니다</li>
        <li>임시 저장 글 2 입니다</li>
        <li>임시 저장 글 3 입니다</li>
      </ul>
    </TabPanel>
    <TabPanel>
      <p>테스트 글 입니다</p>
    </TabPanel>
  </Tabs>);
};

export const BasicTabs = Template.bind({});
BasicTabs.args = {
  /*👇 The args you need here will depend on your component */
};