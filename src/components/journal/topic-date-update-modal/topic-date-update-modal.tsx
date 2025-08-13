import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./topic-date-update-modal.module.scss";
import { useAppDispatch } from "../../../hooks/reduxHooks";

import CustomDatePicker from "../../common/custom-datepicker/custom-datepicker";
import { Box } from "@mui/material";
import {
  getJournalTopicJournalList,
  updateJournalTopicDate,
} from "../../../store/actions/journalListActions";
import { useLocation } from "react-router-dom";
import CustomButton from "../../common/custom-button/custom-button";
import { formatDate } from "../../../utils/helpers";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  date: Yup.string(),
});

interface MyFormValues {
  date: string;
}

const TopicDateUpdateModal: React.FC<{
  onClose: () => void;
  topicID: number;
  date: string;
}> = ({ onClose, topicID, date }) => {
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<MyFormValues>({
    date: date,
  });
  const { pathname } = useLocation();
  console.log(initialValues);
  useEffect(() => {
    setInitialValues({ date: date?.split("T")[0] });
  }, [date, topicID]);
  const handleSubmit = (values: MyFormValues) => {
    console.log("Form values:", values);
    dispatch(
      updateJournalTopicDate({
        ...values,
        id: topicID,
        journal: pathname?.split("/")[3],
      })
    ).then(() => {
      dispatch(
        getJournalTopicJournalList({ journal: pathname?.split("/")[3] })
      );
    });

    onClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "max-content",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, errors, touched }) => (
          <>
            <h2 className={styles.title}>Mavzu sanasini o'zgartirish</h2>
            <Form className={styles.formWrapper}>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Sana</label>
                  <CustomDatePicker
                    value={values.date}
                    fullWidth
                    label=""
                    onChange={(e) => setFieldValue("date", e)}
                  />
                </div>
              </div>
              <div className={styles.submitBtnWrapper}>
                <CustomButton type="submit" className={styles.submitButton}>
                  Saqlash
                </CustomButton>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default TopicDateUpdateModal;
