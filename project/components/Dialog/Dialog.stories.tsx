import React from "react";
import { Story, Meta } from "@storybook/react";
import Dialog from "@/components/Dialog/Dialog";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as Meta;

const Template: Story = () => {
  return (
    <div style={{ position: "relative", width: 500, height: 300 }}>
      {/*<Dialog />*/}
    </div>
  );
};

export const BasicAlertDialog = Template.bind({});
BasicAlertDialog.args = {
  isOpen: false,
};
