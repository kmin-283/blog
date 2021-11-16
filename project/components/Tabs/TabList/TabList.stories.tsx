import React from 'react';
import { Story, Meta } from '@storybook/react';
import TabList from '@/components/Tabs/TabList/TabList';
import Tab from '@/components/Tabs/Tab/Tab';

export default {
  title: 'Components/Tabs/TabList',
  component: TabList,
  argTypes: {
    active: {
      options: ['publish', 'draft', 'test'],
      control: { type: 'radio'}
    }
  }
} as Meta;

const Template: Story = ({active}) => {
  return (
    <div style={{height:300}}>
      <TabList>
        <Tab tabId={"published"} active={active === 'publish'}>게시된 글</Tab>
        <Tab tabId={"drafted"} active={active === 'draft'}>임시 저장 글</Tab>
        <Tab tabId={"tested"} active={active === 'test'}>테스트 글</Tab>
      </TabList>
    </div>
  );
};

export const BasicTabList = Template.bind({});
BasicTabList.args = {
  active: 'publish'
};