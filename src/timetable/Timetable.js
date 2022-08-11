import React, { useCallback, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TimetableRow from "./TimetableRow";
import { withStyles } from "@mui/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InputModal from "../inputModal/InputModal";
import { useRecoilValue } from "recoil";
import { timeTableState } from "../store/store";

const hourData = Array.from({ length: 11 }, (i, j) => j + 9);

const styles = {
  Table: {
    "& th, td": {
      border: "1px solid rgb(221, 221, 221, 1)",
    },
  },
};

const Timetable = ({ classes }) => {
  const timeTableData = useRecoilValue(timeTableState);
  const [showModal, setShowModal] = useState(false);
  const [editInfo, setEditInfo] = useState({});

  const handleClose = useCallback(() => {
    setShowModal(false);
    setEditInfo({});
  }, []);

  const edit = useCallback(
    (day, id) => {
      const { start, end, name, color } = timeTableData[day].find(
        (lectureInfo) => lectureInfo.id === id
      );

      setEditInfo({
        dayData: day,
        startTimeData: start,
        endTimeData: end,
        lectureNameData: name,
        lectureColorData: color,
        idNum: id,
      });
      setShowModal(true);
    },
    [timeTableData]
  );

  return (
    <>
      <TableContainer
        sx={{
          width: "80%",
          minWidth: "650px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="Bold"
          component="div"
          align="center"
          marginBottom={5}
          color="#8B9A46"
        >
          강의시간표
        </Typography>
        <Button
          variant="contain"
          sx={{ float: "right" }}
          endIcon={<AddBoxIcon />}
          onClick={() => setShowModal(true)}
        >
          강의 입력
        </Button>
        <Table className={classes.Table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={100}>
                Time
              </TableCell>
              <TableCell align="center" width={200}>
                Mon
              </TableCell>
              <TableCell align="center" width={200}>
                Tue
              </TableCell>
              <TableCell align="center" width={200}>
                Wed
              </TableCell>
              <TableCell align="center" width={200}>
                Thu
              </TableCell>
              <TableCell align="center" width={200}>
                Fri
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hourData.map((time, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {`${time}:00 ~ ${time + 1}:00`}
                </TableCell>
                <TimetableRow timeNum={time} Edit={edit} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InputModal
        showModal={showModal}
        handleClose={handleClose}
        {...editInfo}
      />
    </>
  );
};

export default withStyles(styles)(Timetable);
