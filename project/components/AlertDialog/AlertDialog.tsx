import React, { FC } from "react";
import styles from "./AlertDialog.module.css";

interface AlertDialogProps {}

const AlertDialog: FC = () => {
  const closeDialog = () => {};
  const deletePost = () => {};

  return (
    <div className={styles.dialogBackdrop}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-label"
        aria-describedby="dialog-desc"
      >
        <h2 className={styles.dialogLabel}>확인</h2>
        <div className={styles.dialogDesc}>
          <p>해당 포스트를 삭제하시겠습니까?</p>
        </div>
        <div className={styles.dialogFormAction}>
          <button type="button" onClick={closeDialog}>
            아니오
          </button>
          <button type="button" onClick={deletePost}>
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
