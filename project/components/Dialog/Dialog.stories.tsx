import React, { useContext } from "react";
import { Story, Meta } from "@storybook/react";
import { DialogContext, DialogProvider } from "@/context/dialogContext";
import AlertDialog from "@/components/Dialog/AlertDialog/AlertDialog";

export default {
  title: "Components/Dialog",
} as Meta;

const TestPage = () => {
  const { handleDialog } = useContext(DialogContext);
  return (
    <div>
      <button onClick={() => handleDialog(<AlertDialog callback={() => {}} />)}>
        dialog toggle
      </button>
    </div>
  );
};

const Template: Story = () => {
  return (
    <div style={{ position: "relative", width: 500, height: 300 }}>
      <div id="not-dialog-root">
        <DialogProvider>
          <TestPage />
        </DialogProvider>
      </div>
      <div id="dialog-root" />
    </div>
  );
};

export const BasicAlertDialog = Template.bind({});
BasicAlertDialog.args = {};
