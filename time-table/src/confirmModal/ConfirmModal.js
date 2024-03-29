import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmModal = ({ openModal, handleClose, handleDelete }) => {
  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>강의 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>해당 강의를 삭제하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
