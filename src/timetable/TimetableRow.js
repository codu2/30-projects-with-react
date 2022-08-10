import React from "react";
import TimetableCell from "./TimetableCell";

const TimetableRow = ({ ...props }) => {
  return (
    <>
      <TimetableCell day="mon" {...props} />
      <TimetableCell day="tue" {...props} />
      <TimetableCell day="wed" {...props} />
      <TimetableCell day="thu" {...props} />
      <TimetableCell day="fri" {...props} />
    </>
  );
};

export default TimetableRow;
