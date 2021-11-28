import React from 'react';
import { Story, Meta } from '@storybook/react';
import InpageNavigation, {InpageNavigationProps} from "@/components/InpageNavigation/InpageNavigation";

export default {
  title: 'Components/InpageNavigation',
  component: InpageNavigation,
} as Meta;

const Template: Story<InpageNavigationProps> = ({internalLinks}) => {
  return (
    <div style={{width: 800}}>
      <InpageNavigation internalLinks={internalLinks} />
    </div>);
};

export const BasicInpageNavigation = Template.bind({});
BasicInpageNavigation.args = {
  internalLinks: "[" +
    "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
    "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
    "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
    "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
    "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
    "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}," +
    "{\"headingLevel\":4,\"value\":\"2-1-3 헤딩\",\"child\":[]}]}," +
    "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[]}]}]\n"
};