import React, { isValidElement, useContext } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";
import { DialogContext } from "@/context/dialogContext";
import { DialogReturn } from "@/hooks/useDialog";

const Dialog = () => {
  const { dialog, handleDialog, dialogContent } =
    useContext<DialogReturn>(DialogContext);

  if (dialog) {
    return createPortal(
      <div className={styles.dialogBackdrop} onClick={() => handleDialog()}>
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog-label"
          aria-describedby="dialog-desc"
        >
          {isValidElement(dialogContent) && dialogContent}
        </div>
      </div>,
      document.querySelector("#dialog-root")!
    );
  }
  return null;
};

export default Dialog;
