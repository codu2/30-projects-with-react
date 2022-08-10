import React from "react";
import {
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

const hourData = Array.from({ length: 11 }, (i, j) => j + 9);

const styles = {
  Table: {
    "& th, td": {
      border: "1px solid rgb(221, 221, 221, 1)",
    },
  },
};

const Timetable = ({ classes }) => {
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
                <TimetableRow timeNum={time} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default withStyles(styles)(Timetable);
