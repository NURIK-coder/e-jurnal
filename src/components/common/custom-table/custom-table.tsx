import React from "react";
import styles from "./custom-table.module.scss";
import { Box, CircularProgress, Pagination } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

interface CustomTableProps {
  theadData: Array<any>;
  tbodyData: any;
  countPage?: number;
  page?: number;
  rowsPerPage?: number;
  onRowClick?: (rowData: any) => void;
  handleChangePage?: (value: number) => void;
  handleChangeRowsPerPage?: (value: any) => void;
  isCollapse?: boolean;
  isCheckbox?: boolean;
  checked?: number[];
  handleChangeParent?: (isChecked: boolean) => void;
  handleRowCheckboxChange?: (rowId: number, isChecked: boolean) => void;
  isLoading?: boolean;
  height?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  theadData,
  tbodyData,
  countPage,
  page,
  rowsPerPage,
  onRowClick,
  handleChangePage,
  handleChangeRowsPerPage,
  isCollapse,
  isCheckbox,
  checked = [],
  handleChangeParent,
  handleRowCheckboxChange,
  isLoading,
  height,
}) => {
  // Check if all rows are checked
  const isAllChecked = checked?.length === tbodyData?.length;

  return (
    <div className={styles.customTable} style={{ height: height || "auto" }}>
      {isLoading ? (
        <div className={styles.loading}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {isCheckbox && (
                  <th>
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={(e) => handleChangeParent?.(e.target.checked)}
                    />
                  </th>
                )}
                {theadData.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tbodyData?.length ? (
                tbodyData?.map((row: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    {isCheckbox && (
                      <td>
                        <input
                          type="checkbox"
                          checked={checked.includes(rowIndex)}
                          onChange={(e) =>
                            handleRowCheckboxChange?.(
                              rowIndex,
                              e.target.checked
                            )
                          }
                        />
                      </td>
                    )}
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        onDoubleClick={() =>
                          onRowClick && onRowClick(+row.id - 1)
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={theadData.length + (isCheckbox ? 1 : 0)}>
                    <h3 style={{ padding: "20px" }}>Ma'lumot mavjud emas</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!!(
        countPage &&
        rowsPerPage &&
        handleChangePage &&
        Math.floor(+countPage / rowsPerPage) + (+countPage % rowsPerPage && 1) >
          1
      ) && (
        <div className={styles.paginationContainer}>
          <Pagination
            count={
              Math.floor(+countPage / rowsPerPage) +
                (+countPage % rowsPerPage && 1) || 1
            }
            page={page}
            onChange={(e, value) => handleChangePage(value)}
            renderItem={(item) =>
              item.type === "previous" ? (
                <button onClick={item.onClick} disabled={item.disabled}>
                  <NavigateBeforeIcon />
                </button>
              ) : item.type === "page" ? (
                <button
                  disabled={item.selected}
                  className="page"
                  onClick={item.onClick}
                >
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
  );
};

export default CustomTable;
