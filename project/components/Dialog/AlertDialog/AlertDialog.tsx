import React, { FC, useContext } from "react";
import styles from "./AlertDialog.module.css";
import { DialogContext } from "@/context/dialogContext";
import { DialogReturn } from "@/hooks/useDialog";

export interface AlertDialogProps {
  callback: () => void;
}

const AlertDialog: FC<AlertDialogProps> = ({ callback }) => {
  const { handleDialog } = useContext<DialogReturn>(DialogContext);

  const onClickHandle = () => {
    handleDialog();
    callback();
  };

  return (
    <>
      <h2 className={styles.dialogLabel}>확인</h2>
      <div className={styles.dialogDesc}>
        <p>해당 포스트를 삭제하시겠습니까?</p>
      </div>
      <div className={styles.dialogFormAction}>
        <button type="button" onClick={() => handleDialog()}>
          아니오
        </button>
        <button type="button" onClick={onClickHandle}>
          예
        </button>
      </div>
    </>
  );
};

export default AlertDialog;
