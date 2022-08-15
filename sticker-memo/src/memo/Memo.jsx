import React, {
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from "@billy-fe/draggable";
import { debounce } from "underscore";
import { observer } from "mobx-react";

function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
  const handleRef = useRef(null);
  const memoContainer = useRef(null);

  const onChangeMemo = useMemo(
    () => debounce((e) => Edit(item.id, e.target.value), 500),
    [item.id, Edit]
  );

  const onChangeSize = useMemo(
    () =>
      debounce((entry) => {
        const { width, height } = entry[0].contentRect;
        SetWidthHeight(item.id, width, height);
      }, 100),
    [item.id, SetWidthHeight]
  );

  const onChangePosition = useCallback(
    (x, y) => SetPosition(item.id, x, y),
    [item.id, SetPosition]
  );

  const onClickDelete = useCallback(() => Delete(item.id), [item.id, Delete]);

  useEffect(() => {
    return () => {
      onChangeMemo.cancel();
      onChangeSize.cancel();
    };
  }, [onChangeMemo, onChangeSize]);

  useLayoutEffect(() => {
    let RO = new ResizeObserver(onChangeSize);
    RO.observe(memoContainer.current);
    return () => {
      RO.disconnect();
      RO = null;
    };
  });

  return (
    <Draggable
      handleRef={handleRef}
      x={item.x}
      y={item.y}
      onMove={onChangePosition}
    >
      <div
        className="memo-container"
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
        ref={memoContainer}
      >
        <div className="menu">
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: "move", fontSize: "25px" }}
          />
          <CloseIcon
            sx={{ cursor: "pointer", fontSize: "23px" }}
            onClick={onClickDelete}
          />
        </div>
        <textarea
          name="txt"
          defaultValue={item.content}
          placeholder="Enter memo here"
          className="memo-text-area"
          onChange={onChangeMemo}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default observer(Memo);

// memo의 width, height 사이즈 변경은 ResizeObserver 메서드로 알 수 있음
