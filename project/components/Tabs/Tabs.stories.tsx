import React, {ComponentProps, useState} from 'react';
import { Story, Meta } from '@storybook/react';
import Tabs  from '@/components/Tabs/Tabs';
import TabList from "@/components/Tabs/TabList/TabList";
import Tab from "@/components/Tabs/Tab/Tab";
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";

export default {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
} as Meta;

const Template: Story = (args) => {
  const [tabActive, setTabActive] = useState<string>('publish');
  return (<Tabs>
    <TabList>
      <Tab tabId={"published"} active={tabActive === 'publish'}>게시된 글</Tab>
      <Tab tabId={"drafted"} active={tabActive === 'draft'}>임시 저장 글</Tab>
    </TabList>
    <TabPanel tabId={"published"} isHidden={tabActive !== 'publish'}>
      <p>게시된 글 입니다</p>
    </TabPanel>
    <TabPanel tabId={"drafted"} isHidden={tabActive !== 'draft'}>
      <p>임시 저장 글 입니다</p>
    </TabPanel>
  </Tabs>);
};

export const BasicTabs = Template.bind({});
BasicTabs.args = {
  /*👇 The args you need here will depend on your component */
};