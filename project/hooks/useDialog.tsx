import React, { useState, isValidElement } from "react";

export type DialogReturn = {
  dialog: boolean;
  handleDialog: (content?: null | JSX.Element) => void;
  dialogContent: JSX.Element | null;
};

const useDialog = (): DialogReturn => {
  const [dialog, setDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  const handleDialog = (content: null | JSX.Element = null) => {
    // prevState를 사용하면 bubbling때문에 상태가 2번 변경되는 경우가 생겨서
    // false -> true -> false 로 상태가 변하지 않음.
    setDialog(!dialog);
    if (isValidElement(content)) {
      setDialogContent(content);
    }
  };
  return { dialog, handleDialog, dialogContent };
};

export default useDialog;
