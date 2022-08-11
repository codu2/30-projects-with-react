import React, { useCallback, useMemo, useState, memo } from "react";
import { TableCell } from "@mui/material";
import { useRecoilState } from "recoil";
import { timeTableState } from "../store/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../confirmModal/ConfirmModal";

const TimetableCell = ({ day, timeNum, Edit }) => {
  const [timeTableData, setTimeTableData] = useRecoilState(timeTableState);
  const [hover, setHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const timeData = useMemo(
    () =>
      timeTableData[day].find(
        (time) => time.start <= timeNum && timeNum < time.end
      ),
    [day, timeNum, timeTableData]
  );

  const handleEdit = useCallback(
    () => Edit(day, timeData.id),
    [Edit, day, timeData?.id]
  );

  const handleConfirm = useCallback(() => setOpenModal(true), []);

  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleDelete = useCallback(() => {
    setTimeTableData((oldTimeTableData) => {
      const newDayData = oldTimeTableData[day].filter(
        (data) => data.id !== timeData.id
      );
      return {
        ...oldTimeTableData,
        [day]: newDayData,
      };
    });
    setOpenModal(false);
  }, [day, setTimeTableData, timeData?.id]);

  return (
    <>
      {timeData?.start === timeNum ? (
        <TableCell
          style={{ backgroundColor: timeData.color, position: "relative" }}
          align="center"
          rowSpan={timeData.end - timeData.start}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {timeData.name}
          {hover ? (
            <div style={{ position: "absolute", top: 5, right: 5 }}>
              <EditIcon
                sx={{ fontSize: "20px" }}
                style={{ cursor: "pointer" }}
                onClick={handleEdit}
              />
              <DeleteIcon
                sx={{ fontSize: "20px" }}
                style={{ cursor: "pointer" }}
                onClick={handleConfirm}
              />
            </div>
          ) : null}
        </TableCell>
      ) : timeData?.start < timeNum && timeNum < timeData?.end ? null : (
        <TableCell />
      )}
      <ConfirmModal
        openModal={openModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default memo(TimetableCell);
