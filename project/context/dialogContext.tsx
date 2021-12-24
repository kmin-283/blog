import React, { FC, createContext, Context } from "react";
import useDialog from "@/hooks/useDialog";
import Dialog from "@/components/Dialog/Dialog";

const defaultValue = {};

let DialogContext: Context<any>;
const { Provider } = (DialogContext = createContext(defaultValue));

const DialogProvider: FC = ({ children }) => {
  const { dialog, handleDialog, dialogContent } = useDialog();

  return (
    <Provider value={{ dialog, handleDialog, dialogContent }}>
      {children}
      <Dialog />
    </Provider>
  );
};

export { DialogContext, DialogProvider };
