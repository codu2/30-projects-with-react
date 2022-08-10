import React, { useMemo } from "react";
import { TableCell } from "@mui/material";
import { useRecoilState } from "recoil";
import { timeTableState } from "../store/store";

const TimetableCell = ({ day, timeNum }) => {
  const [timeTableData, setTimeTableData] = useRecoilState(timeTableState);

  const timeData = useMemo(
    () =>
      timeTableData[day].find(
        (time) => time.start <= timeNum && timeNum < time.end
      ),
    [day, timeNum, timeTableData]
  );

  return (
    <>
      {timeData?.start === timeNum ? (
        <TableCell
          style={{ backgroundColor: timeData.color, position: "relative" }}
          align="center"
          rowSpan={timeData.end - timeData.start}
        >
          {timeData.name}
        </TableCell>
      ) : timeData?.start < timeNum && timeNum < timeData?.end ? null : (
        <TableCell />
      )}
    </>
  );
};

export default TimetableCell;
