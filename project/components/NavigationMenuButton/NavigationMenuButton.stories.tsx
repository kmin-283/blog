import React from 'react';
import { Story, Meta } from '@storybook/react';
import NavigationMenuButton, {NavigationMenuButtonProps} from '@/components/NavigationMenuButton/NavigationMenuButton';

export default {
  title: 'Components/NavigationMenuButton',
  component: NavigationMenuButton,
} as Meta;

const Template: Story<NavigationMenuButtonProps> = ({internalLinks}) => {
  
  return (
    <div style={{position:'relative', width: 500, height: 300}}>
      <NavigationMenuButton internalLinks={internalLinks}>
        버튼을 누르면 나옵니다
      </NavigationMenuButton>
    </div>);
};

export const BasicNavigationMenuButton = Template.bind({});
BasicNavigationMenuButton.args = {
  internalLinks: "[" +
    "{\"headingLevel\":2,\"value\":\"1 헤딩\",\"child\":[]}," +
    "{\"headingLevel\":2,\"value\":\"2 헤딩\",\"child\":[" +
    "{\"headingLevel\":3,\"value\":\"2-1 헤딩\",\"child\":[" +
    "{\"headingLevel\":4,\"value\":\"2-1-1 헤딩\",\"child\":[]}," +
    "{\"headingLevel\":4,\"value\":\"2-1-2 헤딩\",\"child\":[" +
    "{\"headingLevel\":5,\"value\":\"2-1-2-1 헤딩\",\"child\":[]}]}," +
    "{\"headingLevel\":4,\"value\":\"2-1-3 헤딩\",\"child\":[]}]}," +
    "{\"headingLevel\":3,\"value\":\"2-2 헤딩\",\"child\":[]}]}]\n",
};