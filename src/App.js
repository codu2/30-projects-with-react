import React, { useCallback } from "react";
import { observer } from "mobx-react";
import Memo from "./memo/Memo";
import AddIcon from "@mui/icons-material/Add";

function App({ store }) {
  const addMemo = useCallback(() => store.addMemo(), [store]);
  const editMemo = useCallback(
    (id, content) => store.editMemo(id, content),
    [store]
  );
  const setWidthHeight = useCallback(
    (id, width, height) => store.setWidthHeight(id, width, height),
    [store]
  );
  const setPosition = useCallback(
    (id, x, y) => store.setPosition(id, x, y),
    [store]
  );
  const deleteMemo = useCallback((id) => store.deleteMemo(id), [store]);

  return (
    <>
      {store.memos.map((memo) => (
        <Memo
          key={memo.id}
          item={memo}
          Edit={editMemo}
          SetWidthHeight={setWidthHeight}
          SetPosition={setPosition}
          Delete={deleteMemo}
        />
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
