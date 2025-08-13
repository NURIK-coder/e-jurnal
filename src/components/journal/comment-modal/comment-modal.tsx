// CommentModal.tsx
import React, { useState } from "react";
import styles from "./comment-modal.module.scss";
import { Box, Modal } from "@mui/material";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment) {
      onSubmit(comment);
      setComment("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "max-content",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "8px",
          p: 2,
        }}
      >
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>O'zgartirish sababi:</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.textarea}
            />
            <div className={styles.actions}>
              <button onClick={handleSubmit} className={styles.submitButton}>
                Saqlash
              </button>
              <button onClick={onClose} className={styles.cancelButton}>
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CommentModal;
