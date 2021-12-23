import React from "react";
import { Story, Meta } from "@storybook/react";
import AlertDialog from "@/components/AlertDialog/AlertDialog";

export default {
  title: "Components/AlertDialog",
  component: AlertDialog,
} as Meta;

const Template = () => {
  return (
    <div style={{ position: "relative", width: 500, height: 300 }}>
      <AlertDialog />
    </div>
  );
};

export const BasicAlertDialog = Template.bind({});
// BasicAlertDialog.args = {};
