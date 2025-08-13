import React, { useEffect, useState } from "react";
import styles from "./custom-comment.module.scss";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createJournalComment,
  getJournalCommentList,
} from "../../../store/actions/journalListActions";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/helpers";
interface Comment {
  id: number;
  text: string;
}

const CustomComment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { journalCommentList } = useAppSelector((state) => state.journalList);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(getJournalCommentList({ journal: pathname.split("/")[3] }));
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = { id: Date.now(), text: comment };
      setComments([...comments, newComment]);
      setComment("");
      dispatch(
        createJournalComment({ comment, journal: pathname.split("/")[3] })
      );
    }
  };

  return (
    <div className={styles.commentSectionWrapper}>
      <Accordion
        sx={{
          boxShadow: "none",
          background: "transparent",
          borderRadius: "8px",
        }}
      >
        <AccordionSummary
          sx={{ borderRadius: "8px" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h3>Izohlar</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ul className={styles.commentList}>
            {journalCommentList.results?.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                <h3>{comment.created_by?.username}</h3>
                <span>{formatDate(comment.created_at)}</span>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
          {["admin", "superadmin", "dean"].includes(
            String(sessionStorage.getItem("userRole"))
          ) && (
            <div className={styles.commentContainer}>
              <form className={styles.commentForm} onSubmit={handleSubmit}>
                <textarea
                  className={styles.commentInput}
                  value={comment}
                  onChange={handleInputChange}
                  placeholder={"Izoh qoldiring"}
                  rows={4}
                />
                <button type="submit" className={styles.submitButton}>
                  <SendIcon />
                </button>
              </form>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomComment;
