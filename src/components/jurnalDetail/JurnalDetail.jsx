import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Modal, Pagination, Popper, Tab, Tabs } from "@mui/material";
import CustomTable from "../../components/common/custom-table/custom-table";
import CustomButton from "../../components/common/custom-button/custom-button";
import CustomSelector from "../../components/common/custom-selector/custom-selector";
import CustomComment from "../../components/common/custom-comment/custom-comment";
import CommentModal from "../../components/journal/comment-modal/comment-modal";
import TopicDateUpdateModal from "../../components/journal/topic-date-update-modal/topic-date-update-modal";
import useSearch from "../../hooks/useSearch";
import UseReplace from "../../hooks/useReplace";
import {
  createStudentMark,
  downloadJournalExcel,
  
  getJournalStudentsMarkList,
  getJournalTopicJournalList,
  updateStudentMark,
} from "../../store/actions/journalListActions";
import {
  calculateOrderInPage,
  formatDate,
  journalStatuses,
  journalTypes,
  scoreTypes,
} from "../../utils/helpers";
import styles from "./journal.module.scss";
import { jurnalDetail } from "../../store/journal/jurnalActions";


export default function JournalDetail() {
  const dispatch = useAppDispatch();
  const journalList = useAppSelector((state) => state.journalList) || {};
  const {
    journalTopicJournalList = {},
    journalStudentsMarkList = {},
    journalDetail = {},
    pendingJournalTopicList = false,
  } = journalList;
  const profileState = useAppSelector((state) => state.profile) || {};
  const { profile = {} } = profileState;
  const {journal_id} = useParams();
  
  

  const query = useSearch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentPageJournalTopic, setCurrentPageJournalTopic] = useState(1);
  const [currentPageJournal, setCurrentPageJournal] = useState(1);
  const [currentPageTopic, setCurrentPageTopic] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCell, setCurrentCell] = useState();
  const [open, setOpen] = useState("");
  const [anchorEl, setAnchorEl] = useState();
  const [currentPopperText, setCurrentPopperText] = useState("");

  const tableRef = useRef();
  

  useEffect(() => {
    dispatch(jurnalDetail(journal_id)).then((res) => {
      const groupId = res.payload.group[0]?.id;
      navigate(`${pathname}${UseReplace("group_id", groupId)}`);
      dispatch(
        getJournalStudentsMarkList({
          id: pathname.split("/")[3],
          group_id: groupId,
        })
      );
    });
    dispatch(getJournalTopicJournalList({ journal: pathname.split("/")[3] }));
  }, [dispatch, navigate, pathname]);

  const handleOpenUpdate = (index) => {
    setOpen(`update${index}`);
  };

  const handleClose = () => {
    setOpen("");
  };

  const handleJournalTopicPageChange = (pageNumber) => {
    setCurrentPageJournalTopic(pageNumber);
    dispatch(
      getJournalTopicJournalList({
        journal: pathname.split("/")[3],
        page: pageNumber,
      })
    );
  };

  const handleJournalPageChange = (pageNumber) => {
    setCurrentPageJournal(pageNumber);
    dispatch(
      getJournalStudentsMarkList({
        id: pathname.split("/")[3],
        page: pageNumber,
        group_id: Number(query.get("group_id")),
      })
    );
  };

  const handleTopicPageChange = (pageNumber) => {
    setCurrentPageTopic(pageNumber);
    dispatch(
      getJournalTopicJournalList({
        journal: pathname.split("/")[3],
        page: pageNumber,
      })
    );
  };

  const handleExportToExcel = () => {
    if (!tableRef.current) return;

    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const columnWidths = [
      { wpx: 30 },
      { wpx: 130 },
      ...Array(19).fill({ wpx: 60 }),
      { wpx: 70 },
      { wpx: 70 },
      { wpx: 70 },
      { wpx: 40 },
      { wpx: 70 },
    ];
    ws["!cols"] = columnWidths;

    Object.keys(ws).forEach((cell) => {
      if (ws[cell] && typeof ws[cell] === "object" && !cell.startsWith("!")) {
        ws[cell].s = {
          alignment: {
            wrapText: true,
            vertical: "center",
            horizontal: "center",
          },
        };
      }
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Journal");
    XLSX.writeFile(wb, "Journal.xlsx");
  };

  const handleExportToPDF = () => {
    if (!tableRef.current) return;

    const thElements = tableRef.current.querySelectorAll("th");
    thElements.forEach((th) => {
      th.setAttribute("data-original-style", th.getAttribute("style") || "");
      th.style.textAlign = "left";
      th.style.transform = "";
      th.style.writingMode = "";
      th.style.maxWidth = "max-content";
    });

    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Journal.pdf");

      thElements.forEach((th) => {
        th.setAttribute("style", th.getAttribute("data-original-style") || "");
      });
    });
  };

  const handleCellDoubleClick = () => {
    const cell = event.target ;
    const originalValue = cell.textContent || "";
    const journalType = journalDetail.journal_type;
    const markType = cell.dataset.mark_type;

    const input = document.createElement("input");
    input.type = journalType === "independent_study" ? "number" : "text";
    input.value = originalValue;
    input.style.width = "30px";
    input.style.fontSize = "12px";

    if (journalType === "independent_study") {
      input.max = journalDetail.grade_type === "score" ? "5" : "100";
      input.addEventListener("input", () => {
        if (input.value.includes("-") || +input.value > (journalDetail.grade_type === "score" ? 5 : 100)) {
          input.value = input.value.replace("-", "");
          if (+input.value > (journalDetail.grade_type === "score" ? 5 : 100)) {
            input.value = journalDetail.grade_type === "score" ? "5" : "100";
          }
        }
      });
    }

    if (journalType === "practical") {
      input.addEventListener("input", () => {
        if (+input.value >= (journalDetail.grade_type === "score" ? 5 : 100)) {
          input.value = journalDetail.grade_type === "score" ? "5" : "100";
        }
      });
    }

    if (markType === "attendance") {
      input.addEventListener("input", () => {
        if (!/^-?$/.test(input.value)) {
          input.value = "";
        }
      });
    }

    cell.textContent = "";
    if (cell.dataset.topic_id || cell.dataset.mark_type) {
      cell.appendChild(input);
    }

    input.focus();
    input.select();

    const finishEditing = () => {
      let newValue = input.value;

      if (input.type === "number" && +newValue > (journalDetail.grade_type === "score" ? 5 : 100)) {
        newValue = journalDetail.grade_type === "score" ? "5" : "100";
      }

      if (cell.dataset.mark_id) {
        cell.textContent = newValue;
        setIsModalOpen(true);
        setCurrentCell(cell);
      } else {
        cell.textContent = newValue;
        dispatch(
          createStudentMark({
            mark: markType === "attendance" || newValue.trim() === "-" ? undefined : newValue,
            mark_attendance: markType === "attendance" || newValue.trim() === "-" ? newValue : undefined,
            topic: cell.dataset.topic_id,
            mark_type: markType === "regular" && newValue.trim() === "-" ? "attendance" : markType,
            student: cell.dataset.student_id,
            journal: pathname.split("/")[3],
          })
        ).then(() => {
          dispatch(
            getJournalStudentsMarkList({
              id: pathname.split("/")[3],
              group_id: Number(query.get("group_id")),
              page: currentPageJournal,
            })
          );
        });
      }

      input.removeEventListener("blur", handleBlur);
      input.removeEventListener("keydown", handleKeyDown);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        finishEditing();
      } else if (event.key === "Escape") {
        cell.textContent = originalValue;
      }
    };

    const handleBlur = () => {
      cell.textContent = originalValue;
    };

    input.addEventListener("blur", handleBlur);
    input.addEventListener("keydown", handleKeyDown);
  };

  const handleCommentSubmit = (comment) => {
    if (currentCell && currentCell.dataset.mark_id) {
      const newValue = currentCell.textContent || "";
      dispatch(
        updateStudentMark({
          mark: newValue.trim() === "-" || currentCell.dataset.mark_type === "attendance" ? undefined : newValue,
          mark_attendance:
            newValue.trim() === "-" || currentCell.dataset.mark_type === "attendance" ? newValue : undefined,
          id: currentCell.dataset.mark_id,
          topic: currentCell.dataset.topic_id,
          mark_type:
            currentCell.dataset.mark_type === "regular" && newValue.trim() === "-"
              ? "attendance"
              : currentCell.dataset.mark_type,
          student: currentCell.dataset.student_id,
          journal: pathname.split("/")[3],
          comment,
        })
      ).then(() => {
        dispatch(
          getJournalStudentsMarkList({
            id: pathname.split("/")[3],
            page: currentPageJournal,
            group_id: Number(query.get("group_id")),
          })
        );
      });
    }
    setIsModalOpen(false);
    setCurrentCell(null);
  };

  const handleClick = () => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popper" : undefined;

  return (
    <div className={styles.journalTableContainer}>
      <div className={styles.headerContents}>
        <Tabs
          value={journalDetail.id}
          onChange={(e, value) => navigate(`/journal-list/journal-detail/${value}`)}
          aria-label="Journal Tabs"
        >
          {journalDetail.journal_group?.find((gr) => gr.journal_type === "practical") && (
            <Tab
              sx={{ paddingTop: "0" }}
              label="Amaliy jurnal"
              value={journalDetail.journal_group.find((gr) => gr.journal_type === "practical")?.id}
            />
          )}
          {journalDetail.journal_group?.find((gr) => gr.journal_type === "independent_study") && (
            <Tab
              sx={{ paddingTop: "0" }}
              label="Mustaqil ta'lim jurnal"
              value={journalDetail.journal_group.find((gr) => gr.journal_type === "independent_study")?.id}
            />
          )}
          {journalDetail.journal_group?.find((gr) => gr.journal_type === "lecture") && (
            <Tab
              sx={{ paddingTop: "0" }}
              label="Lekisya jurnal"
              value={journalDetail.journal_group.find((gr) => gr.journal_type === "lecture")?.id}
            />
          )}
        </Tabs>
        <div className={styles.downloadFilesWrapper}>
          <CustomButton
            onClick={() =>
              dispatch(
                downloadJournalExcel({
                  url: `excel/journal/${journalDetail?.id}`,
                })
              )
            }
            className={styles.excelDownloadButton}
          >
            <FileDownloadIcon />
            Excel yuklash
          </CustomButton>
          <div className={styles.groupChangeSelector}>
            <CustomSelector
              placeholder="Guruh"
              name="group_id"
              value={Number(query.get("group_id")) || journalDetail.group?.[0]?.id}
              onChange={(value) => {
                navigate(`${pathname}${UseReplace("group_id", value)}`);
                dispatch(
                  getJournalStudentsMarkList({
                    id: pathname.split("/")[3],
                    group_id: value,
                  })
                );
              }}
              options={journalDetail.group?.map((value) => ({
                label: value.name,
                value: value.id,
              }))}
            />
          </div>
        </div>
      </div>

      <div className={styles.tablesContainer}>
        <CommentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCommentSubmit}
        />
        <div className={styles.leftContainerJournal}>
          <div className={styles.journalWrapper}>
            <table id="journal-table" ref={tableRef}>
              <thead>
                <tr style={{ height: "70px" }}>
                  <th rowSpan={3} colSpan={1}>
                    <p>№</p> <p>T.R</p>
                  </th>
                  <th rowSpan={2} colSpan={1}>
                    Mashg'ulot o'tkazillgan sana
                  </th>
                  <th colSpan={10} style={{ textAlign: "center" }}>
                    Davomat va joriy yil natijalari (baholash 100% hisobidan)
                  </th>
                  {journalDetail.journal_type === "practical" && (
                    <th style={{ writingMode: "vertical-rl", transform: "rotateZ(180deg)" }} rowSpan={3}>
                      JN o'rtacha (%)
                    </th>
                  )}
                  {journalDetail.journal_type === "lecture" ? (
                    <th style={{ writingMode: "vertical-rl", transform: "rotateZ(180deg)" }} rowSpan={3}>
                      Qoldirilgan darslar vaqti
                    </th>
                  ) : (
                    <th style={{ writingMode: "vertical-rl", transform: "rotateZ(180deg)" }} rowSpan={3}>
                      TMI o'rtacha (%)
                    </th>
                  )}
                  {journalDetail.journal_type === "practical" && (
                    <>
                      <th style={{ writingMode: "vertical-rl", transform: "rotateZ(180deg)" }} rowSpan={3}>
                        Oraliq nazorat (%)
                      </th>
                      <th rowSpan={2} colSpan={2}>
                        Yakuniy nazorat (%)
                      </th>
                    </>
                  )}
                </tr>
                <tr>
                  {[...Array(10)].map((_, index) => (
                    <th key={index}>{calculateOrderInPage(currentPageTopic, index, 10)}</th>
                  ))}
                </tr>
                <tr style={{ height: "70px" }}>
                  <th rowSpan={1}>Talabaning F.I.SH.</th>
                  {[...Array(10)].map((_, index) => (
                    <th
                      style={{ writingMode: "vertical-rl", transform: "rotateZ(180deg)" }}
                      rowSpan={1}
                      key={index}
                    >
                      {journalTopicJournalList.results?.[index]?.date
                        ? formatDate(journalTopicJournalList.results[index].date)
                        : ""}
                    </th>
                  ))}
                  {journalDetail.journal_type === "practical" && (
                    <>
                      <th style={{ writingMode: "vertical-rl", transform: "rotateZ(180deg)" }} rowSpan={1}>
                        OSKI,OSI
                      </th>
                      <th style={{ writingMode: "vertical-rl", transform: "rotateZ(180deg)" }} rowSpan={1}>
                        Komp. (yozma)
                      </th>
                    </>
                  )}
                </tr>
                {journalTopicJournalList.count > 10 && (
                  <tr>
                    <th style={{}} colSpan={17}>
                      <div className={styles.paginationContainer}>
                        <Pagination
                          count={Math.ceil(journalTopicJournalList.count / 10) || 1}
                          page={currentPageTopic}
                          onChange={(e, value) => handleTopicPageChange(value)}
                          renderItem={(item) =>
                            item.type === "previous" ? (
                              <button onClick={item.onClick} disabled={item.disabled}>
                                <NavigateBeforeIcon />
                              </button>
                            ) : item.type === "page" ? (
                              <button disabled={item.selected} className="page" onClick={item.onClick}>
                                {item.page}
                              </button>
                            ) : item.type === "next" ? (
                              <button onClick={item.onClick} disabled={item.disabled}>
                                <NavigateNextIcon />
                              </button>
                            ) : (
                              item.type === "end-ellipsis" && <span>...</span>
                            )
                          }
                          color="primary"
                        />
                      </div>
                    </th>
                  </tr>
                )}
              </thead>
              <tbody>
                {journalStudentsMarkList.results?.map((student, idx) => (
                  <tr key={student.id}>
                    <td>{calculateOrderInPage(currentPageJournal, idx, 10)}</td>
                    <td>{student.full_name}</td>
                    {[...Array(10)].map((_, index) =>
                      journalTopicJournalList?.results?.[index] ? (
                        <td
                          style={{
                            color:
                              student.marks?.find(
                                (mark) => mark.topic?.id === journalTopicJournalList.results[index]?.id
                              )?.mark < journalDetail.min_required_marks
                                ? "red"
                                : "#666",
                            fontWeight:
                              student.marks?.find(
                                (mark) => mark.topic?.id === journalTopicJournalList.results[index]?.id
                              )?.mark < journalDetail.min_required_marks
                                ? "600"
                                : "500",
                            border: student.marks?.find(
                              (mark) => mark.topic?.id === journalTopicJournalList.results[index]?.id
                            )?.is_edited
                              ? "2px solid #e2ba43"
                              : "",
                          }}
                          data-mark_type={journalDetail.journal_type === "lecture" ? "attendance" : "regular"}
                          data-topic_id={journalTopicJournalList.results[index]?.id}
                          data-student_id={student.id}
                          data-mark_id={
                            student.marks?.find(
                              (mark) => mark.topic?.id === journalTopicJournalList.results[index]?.id
                            )?.id
                          }
                          aria-describedby={id}
                          onMouseEnter={(event) => {
                            const comment = student.marks?.find(
                              (mark) => mark.topic?.id === journalTopicJournalList.results[index]?.id
                            )?.comment;
                            setCurrentPopperText(comment || "");
                            if (comment) handleClick(event);
                          }}
                          onMouseLeave={handleClosePopper}
                          onDoubleClick={
                            journalTopicJournalList.results[index]?.date &&
                            ["superadmin", "professor"].includes(profile?.active_role)
                              ? handleCellDoubleClick
                              : undefined
                          }
                        >
                          {student.marks?.find(
                            (mark) => mark.topic?.id === journalTopicJournalList.results[index]?.id
                          )?.mark_type === "attendance"
                            ? "-"
                            : student.marks?.find(
                                (mark) => mark.topic?.id === journalTopicJournalList.results[index]?.id
                              )?.mark}
                        </td>
                      ) : (
                        <td key={index}></td>
                      )
                    )}
                    {journalDetail.journal_type === "practical" && <td>{student.average_JN}</td>}
                    {journalDetail.journal_type === "lecture" ? (
                      <td>{student.average_JN}</td>
                    ) : (
                      <td>{student.average_TMI}</td>
                    )}
                    {journalDetail.journal_type === "practical" && (
                      <>
                        <td
                          data-student_id={student.id}
                          data-mark_type="interim_control"
                          data-mark_id={student?.interim_control?.id}
                          onDoubleClick={
                            ["superadmin", "professor"].includes(profile?.active_role)
                              ? handleCellDoubleClick
                              : undefined
                          }
                        >
                          {student?.interim_control?.mark}
                        </td>
                        <td
                          data-student_id={student.id}
                          data-mark_type="final_control_oski"
                          data-mark_id={student?.final_control_oski?.id}
                          onDoubleClick={
                            ["superadmin", "professor"].includes(profile?.active_role)
                              ? handleCellDoubleClick
                              : undefined
                          }
                        >
                          {student?.final_control_oski?.mark}
                        </td>
                        <td
                          data-student_id={student.id}
                          data-mark_type="final_control_write"
                          data-mark_id={student?.final_control_write?.id}
                          onDoubleClick={
                            ["superadmin", "professor"].includes(profile?.active_role)
                              ? handleCellDoubleClick
                              : undefined
                          }
                        >
                          {student?.final_control_write?.mark}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Popper id={id} open={openPopover} anchorEl={anchorEl}>
            <span className={styles.tooltipText}>{currentPopperText}</span>
          </Popper>
          {journalStudentsMarkList.count > 10 && (
            <div className={styles.paginationContainerJournal}>
              <Pagination
                count={Math.ceil(journalStudentsMarkList.count / 10) || 1}
                page={currentPageJournal}
                onChange={(e, value) => handleJournalPageChange(value)}
                renderItem={(item) =>
                  item.type === "previous" ? (
                    <button onClick={item.onClick} disabled={item.disabled}>
                      <NavigateBeforeIcon />
                    </button>
                  ) : item.type === "page" ? (
                    <button disabled={item.selected} className="page" onClick={item.onClick}>
                      {item.page}
                    </button>
                  ) : item.type === "next" ? (
                    <button onClick={item.onClick} disabled={item.disabled}>
                      <NavigateNextIcon />
                    </button>
                  ) : (
                    item.type === "end-ellipsis" && <span>...</span>
                  )
                }
                color="primary"
                style={{ marginLeft: "auto" }}
              />
            </div>
          )}
        </div>
        <div className={styles.rightContainerJournal}>
          <div className={styles.aboutJournal}>
            <p>Ma'lumot</p>
            <div className={styles.aboutDetailBox}>
              <h4>Guruhlar</h4>
              <p className={styles.aboutGroups}>
                {journalDetail?.group?.map((group, idx) => (
                  <Chip
                    sx={{
                      height: "auto",
                      "& .MuiChip-label": {
                        display: "block",
                        whiteSpace: "normal",
                      },
                    }}
                    key={idx}
                    size="small"
                    label={group.name}
                  />
                ))}
              </p>
            </div>
            <div className={styles.aboutDetailBox}>
              <h4>Fan</h4>
              <p>{journalDetail?.subject?.name}</p>
            </div>
            <div className={styles.aboutDetailBox}>
              <h4>O'qituvchi</h4>
              <p>{journalDetail?.professor?.full_name}</p>
            </div>
            <div className={styles.aboutDetailBox}>
              <h4>Jurnal turi</h4>
              <p>{journalTypes.find((type) => type.value === journalDetail?.journal_type)?.label}</p>
            </div>
            <div className={styles.aboutDetailBox}>
              <h4>Jurnal holati</h4>
              <p>{journalStatuses.find((type) => type.value === journalDetail?.journal_status)?.label}</p>
            </div>
            <div className={styles.aboutDetailBox}>
              <h4>Baholash turi</h4>
              <p>{scoreTypes.find((type) => type.value === journalDetail?.grade_type)?.label}</p>
            </div>
          </div>
          {["admin", "superadmin", "dean", "professor"].includes(String(sessionStorage.getItem("userRole"))) && (
            <CustomComment />
          )}
          <div className={styles.topicTableWrapper}>
            <CustomTable
              theadData={
                ["superadmin", "professor"].includes(profile?.active_role)
                  ? ["№", "Soat miqdori", "Mashg'ulotlarning mavzulari", "Mashg'ulot sanasi", ""]
                  : ["№", "Soat miqdori", "Mashg'ulotlarning mavzulari", "Mashg'ulot sanasi"]
              }
              page={currentPageTopic}
              rowsPerPage={10}
              height={journalDetail.journal_group?.find((gr) => gr.journal_type === "practical") ? "485px" : "485px"}
              countPage={journalTopicJournalList.count}
              handleChangePage={handleTopicPageChange}
              isLoading={pendingJournalTopicList}
              tbodyData={journalTopicJournalList?.results?.map((topic, index) =>
                ["superadmin", "professor"].includes(profile?.active_role)
                  ? {
                      id: calculateOrderInPage(currentPageTopic, index, 10),
                      lesson_hour: topic.topic?.lesson_hour,
                      name: topic.topic?.name,
                      date: formatDate(topic?.date),
                      edit: (
                        <>
                          <CustomButton onClick={() => handleOpenUpdate(topic.id)} className={styles.topicUpdateBtn}>
                            <EditIcon sx={{ fontSize: "11px" }} />
                          </CustomButton>
                          <Modal open={open === `update${topic.id}`} onClose={handleClose}>
                            <TopicDateUpdateModal topicID={topic.id} date={topic.date} onClose={handleClose} />
                          </Modal>
                        </>
                      ),
                    }
                  : {
                      id: calculateOrderInPage(currentPageTopic, index, 10),
                      lesson_hour: topic.topic?.lesson_hour,
                      name: topic.topic?.name,
                      date: formatDate(topic.date),
                    }
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
