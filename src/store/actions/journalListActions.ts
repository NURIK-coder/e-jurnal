import { AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import { httpRequest } from "../../utils/request";
import useSearch from "../../hooks/useSearch";
import { toast } from "react-toastify";

export const getJournalList = createAsyncThunk(
  "journalList/getJournalList",
  async (data: any, thunkAPI) => {
    const { query } = data;
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/list/?${
          data.page || query?.get("page")
            ? `page=${data.page || query?.get("page")}`
            : ""
        }${
          data.professor || query?.get("professor")
            ? `&professor=${data.professor || query?.get("professor")}`
            : ""
        }${query?.get("subject") ? `&subject=${query?.get("subject")}` : ""}${
          query?.get("specialty") ? `&specialty=${query?.get("specialty")}` : ""
        }${query?.get("group") ? `&group=${query?.get("group")}` : ""}${
          query?.get("journal_type")
            ? `&journal_type=${query?.get("journal_type")}`
            : ""
        }${query?.get("level") ? `&level=${query?.get("level")}` : ""}${
          query?.get("search-name")
            ? `&search=${query?.get("search-name")}`
            : ""
        }${data?.student ? `&student=${data?.student}` : ""}`,
      })
    );
  }
);
export const getJournalDetail = createAsyncThunk(
  "journalList/getJournalDetail",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/detail/${data.id}/?${
          data.page ? `page=${data.page}` : ""
        }`,
      })
    );
  }
);
export const getJournalStudentsMarkList = createAsyncThunk(
  "journalList/getJournalStudentsMarkList",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/${data.id}/student/list/?${
          data.page ? `page=${data.page}` : ""
        }${data.group_id ? `&group_id=${data.group_id}` : ""}`,
      })
    );
  }
);
export const getJournalTopicList = createAsyncThunk(
  "journalList/getJournalTopicList",
  async (data: any, thunkAPI) => {
    const { query } = data;
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/list/?subject_id=${data.subject_id}${
          data.page || query?.get("page")
            ? `&page=${data.page || query?.get("page")}`
            : ""
        }${
          query?.get("search-name")
            ? `&search=${query?.get("search-name")}`
            : ""
        }`,
      })
    );
  }
);
export const getJournalTopicDetail = createAsyncThunk(
  "journalList/getJournalTopicDetail",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/detail/${data.id}/`,
      })
    );
  }
);
export const getJournalCommentList = createAsyncThunk(
  "journalList/getJournalCommentList",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/comments/list/?${data.page ? `page=${data.page}` : ""}${
          data.journal ? `&journal_id=${data.journal}` : ""
        }`,
      })
    );
  }
);
export const getJournalTopicJournalList = createAsyncThunk(
  "journalList/getJournalTopicJournalList",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/journal/list/?journal_id=${data.journal}${
          data.page ? `&page=${data.page}` : ""
        }`,
      })
    );
  }
);
export const getJournalSubjectList = createAsyncThunk(
  "journalList/getJournalSubjectList",
  async (data: any, thunkAPI) => {
    const { query } = data;
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/subject/list/?${
          data.page || query?.get("page")
            ? `page=${data.page || query?.get("page")}`
            : ""
        }${data?.journal_type ? `&journal_type=${data?.journal_type}` : ""}${
          query?.get("search-name")
            ? `&search=${query?.get("search-name")}`
            : ""
        }${
          query?.get("specialty") ? `&specialty=${query?.get("specialty")}` : ""
        }${
          query?.get("journal_type")
            ? `&journal_type=${query?.get("journal_type")}`
            : ""
        }${query?.get("level") ? `&level=${query?.get("level")}` : ""}`,
      })
    );
  }
);
export const getJournalSubjectDetail = createAsyncThunk(
  "journalList/getJournalSubjectDetail",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/subject/detail/${data.id}/?${
          data.page ? `page=${data.page}` : ""
        }${data.journal_type ? `&journal_type=${data.journal_type}` : ""}`,
      })
    );
  }
);
export const getJournalTopicExamTest = createAsyncThunk(
  "journalList/getJournalTopicExamTest",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/exam/${data.subject}/detail`,
      })
    );
  }
);
export const getGatheredJournalSubjectList = createAsyncThunk(
  "journalList/getGatheredJournalSubjectList",
  async (data: any, thunkAPI) => {
    return await thunkAPI.dispatch(
      httpRequest({
        url: `journal/subject/list/?${data.page ? `page=${data.page}` : ""}${
          data.journal_type ? `&journal_type=${data.journal_type}` : ""
        }`,
      })
    );
  }
);
export const createJournal = createAsyncThunk(
  "journalList/createJournal",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/create/`,
        method: "POST",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const deleteJournalList = createAsyncThunk(
  "journalList/deleteJournalList",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/delete`,
        method: "POST",
        body: data,
      })
    );

    if (res) {
      toast.success("Jurnallar muvaffaqiyatli o'chirildi");
      return res;
    }
  }
);
export const deleteJournalSubjectList = createAsyncThunk(
  "journalList/deleteJournalSubjectList",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/subject/delete`,
        method: "POST",
        body: data,
      })
    );

    if (res) {
      toast.success("Fanlar muvaffaqiyatli o'chirildi");
      return res;
    }
  }
);
export const deleteJournalTopicList = createAsyncThunk(
  "journalList/deleteJournalTopicList",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/delete`,
        method: "POST",
        body: data,
      })
    );

    if (res) {
      toast.success("Mavzular muvaffaqiyatli o'chirildi");
      return res;
    }
  }
);
export const createStudentMark = createAsyncThunk(
  "journalList/createStudentMark",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/mark/create/`,
        method: "POST",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const createJournalComment = createAsyncThunk(
  "journalList/createJournalComment",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/comments/create/`,
        method: "POST",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const createJournalTopicExamTest = createAsyncThunk(
  "journalList/createJournalTopicExamTest",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/exam/create/`,
        method: "POST",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const updateJournalTopicExamTest = createAsyncThunk(
  "journalList/updateJournalTopicExamTest",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/exam/update/${data.subject}/`,
        method: "POST",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const updateStudentMark = createAsyncThunk(
  "journalList/createStudentMark",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/mark/update/${data.id}/`,
        method: "PUT",
        body: data,
      })
    );

    if (res.mark) {
      toast.success("success");
      return res;
    }
  }
);
export const updateJournalTopicDate = createAsyncThunk(
  "journalList/updateJournalTopicDate",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/date/update/${data.id}/`,
        method: "PUT",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const updateJournal = createAsyncThunk(
  "journalList/updateJournal",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/update/${data.id}/`,
        method: "PUT",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const createJournalSubject = createAsyncThunk(
  "journalList/createJournalSubject",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/subject/create/`,
        method: "POST",
        body: data,
      })
    );

    if (res.id) {
      toast.success("Fan muvaffaqiyatli yaratildi");
      return res;
    }
  }
);
export const updateJournalSubject = createAsyncThunk(
  "journalList/updateJournalSubject",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/subject/update/${data.id}/`,
        method: "PATCH",
        body: data,
      })
    );

    if (res.id) {
      toast.success("Fan muvaffaqiyatli o'zgartirildi");
      return res;
    }
  }
);
export const createJournalTopic = createAsyncThunk(
  "journalList/createJournalTopic",
  async (data: any, thunkAPI) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lesson_hour", data.lesson_hour);
    formData.append("subject", data.subject);
    formData.append("givenMinutes", data.givenMinutes);
    formData.append("maxAttempts", data.maxAttempts);
    formData.append("amountInTest", data.amountInTest);
    formData.append("language", data.language);
    data.test_file && formData.append("test_file", data.test_file);
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/create/`,
        method: "POST",
        body: formData,
        haveImg: true,
      })
    );

    if (res.id) {
      toast.success("Mavzu muvaffaqiyatli yaratildi");
      return res;
    }
  }
);
export const updateJournalTopic = createAsyncThunk(
  "journalList/updateJournalTopic",
  async (data: any, thunkAPI) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lesson_hour", data.lesson_hour);
    formData.append("subject", data.subject);
    formData.append("givenMinutes", data.givenMinutes);
    formData.append("maxAttempts", data.maxAttempts);
    formData.append("amountInTest", data.amountInTest);
    formData.append("language", data.language);
    data.test_file && formData.append("test_file", data.test_file);
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/update/${data.id}/`,
        method: "PATCH",
        body: formData,
        haveImg: true,
      })
    );

    if (res.id) {
      toast.success("Mavzu muvaffaqiyatli yangilandi");
      return res;
    }
  }
);
export const updateJournalSubjectTopic = createAsyncThunk(
  "journalList/updateJournalSubjectTopic",
  async (data: any, thunkAPI) => {
    const res = await thunkAPI.dispatch(
      httpRequest({
        url: `journal/topic/update/${data.id}/`,
        method: "PUT",
        body: data,
      })
    );

    if (res.id) {
      toast.success("success");
      return res;
    }
  }
);
export const downloadJournalExcel = createAsyncThunk(
  "journalList/downloadJournalExcel",
  async ({ url }: { url: string }, thunkAPI) => {
    const fileRes = await thunkAPI.dispatch(
      httpRequest({
        url: `${url}`,
        noJson: true,
      })
    );
    const blob = await fileRes.blob();

    const blobURL = window.URL.createObjectURL(new Blob([blob]));
    const file = document.createElement("a");
    file.href = blobURL;
    file.setAttribute("download", "Document.xlsx");
    document.body.appendChild(file);
    file.click();
    file.remove();
  }
);
