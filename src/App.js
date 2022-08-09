import React, { useCallback } from "react";
import { observer } from "mobx-react";
import Memo from "./memo/Memo";
import AddIcon from "@mui/icons-material/Add";

function App({ store }) {
  const addMemo = useCallback(() => store.addMemo(), [store]);

  return (
    <>
      {store.memos.map((memo) => (
        <Memo key={memo.id} />
      ))}
      <AddIcon
        sx={{
          float: "right",
          backgroundColor: "ghostWhite",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "30px",
          border: "1px solid #000",
        }}
        onClick={addMemo}
      />
    </>
  );
}

export default observer(App);
