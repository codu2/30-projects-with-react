import React, { useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from "@billy-fe/draggable";

function Memo({ item, Delete, Edit, SetPosition, setWidthHeight }) {
  const handleRef = useRef(null);

  return (
    <Draggable
      handleRef={handleRef}
      x={0}
      y={0}
      onMove={(x, y) => console.log(x, y)}
    >
      <div
        className="memo-container"
        style={{ width: `${250}px`, height: `${300}px` }}
      >
        <div className="menu">
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: "move", fontSize: "25px" }}
          />
          <CloseIcon sx={{ cursor: "pointer", fontSize: "23px" }} />
        </div>
        <textarea
          name="txt"
          defaultValue={"Enter memo here"}
          placeholder="Enter memo here"
          className="memo-text-area"
        ></textarea>
      </div>
    </Draggable>
  );
}

export default Memo;
