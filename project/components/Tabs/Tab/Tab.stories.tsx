import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tab from "@/components/Tabs/Tab/Tab";
import {TabProps} from "@/components/Tabs/Tab/Tab";

export default {
  title: 'Components/Tabs/Tab',
  component: Tab,
} as Meta;

const Template: Story<TabProps> = ({active, tabId}) => {
  return (
    <div style={{width:150, height:50}}>
      <Tab tabId={tabId} active={active}>게시된 글</Tab>
    </div>
  );
};

export const BasicTab = Template.bind({});
BasicTab.args = {
  /*👇 The args you need here will depend on your component */
  active: true,
  tabId: "published"
};