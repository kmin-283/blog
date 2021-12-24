import React, { FC, useContext } from "react";
import styles from "./AlertDialog.module.css";
import { DialogContext } from "@/context/dialogContext";
import { DialogReturn } from "@/hooks/useDialog";
import { BiTrash } from "react-icons/bi";

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
    <div className={styles.alertDialog}>
      <div className={styles.dialogHeader}>
        <BiTrash size="3em" />
        <h2 className={styles.dialogLabel}>게시글 삭제</h2>
      </div>
      <div className={styles.dialogDesc}>
        <p>해당 게시글을 삭제하시겠습니까?</p>
        <p>삭제 이후에는 복구할 수 없습니다.</p>
      </div>
      <div className={styles.dialogFormAction}>
        <button
          className={styles.no}
          type="button"
          onClick={() => handleDialog()}
        >
          아니오
        </button>
        <button className={styles.yes} type="button" onClick={onClickHandle}>
          예
        </button>
      </div>
    </div>
  );
};

export default AlertDialog;
