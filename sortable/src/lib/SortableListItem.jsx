import React, { useRef } from "react";

const SortableListItem = ({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem,
}) => {
  const itemRef = useRef(null);

  const onDragStartItem = () => {
    itemRef.current.classList.add("dragstart");
    onDragStart(index);
  };

  const onDragEnd = () => {
    itemRef.current.classList.remove("dragstart");
  };

  const onDragEnter = () => {
    itemRef.current.classList.add("dragover");
  };

  const onDragLeave = () => {
    itemRef.current.classList.remove("dragover");
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = () => {
    // onDrop 이벤트가 발생하기 위해서는 onDragOver를 event.preventDefault() 해주어야 함
    itemRef.current.classList.remove("dragover");
    onDropItem(index);
  };

  const onClick = () => {
    onClickItem(index);
  };

  return (
    <li
      ref={itemRef}
      className="item"
      draggable={draggable ? draggable : false}
      onDragStart={onDragStartItem}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default SortableListItem;
