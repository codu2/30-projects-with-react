import React, { useCallback, useState } from "react";
import "./SortableList.css";
import SortableListItem from "./SortableListItem";

const SortableList = ({ data, onDropItem, onClickItem, renderItem }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);

  const onDragStart = (index) => {
    setStartIndex(index);
  };

  const onDrop = useCallback(
    (dropIndex) => {
      const dragItem = listData[startIndex];
      // drop 하려는 item
      const list = [...listData];
      list.splice(startIndex, 1);
      // drop이 될 item을 splice로 복사한 배열에서 잘라냄
      const newListData =
        startIndex < dropIndex
          ? [
              ...list.slice(0, dropIndex - 1),
              dragItem,
              ...list.slice(dropIndex - 1, list.length),
            ]
          : [
              ...list.slice(0, dropIndex),
              dragItem,
              ...list.slice(dropIndex, list.length),
            ];
      setListData(newListData);
      onDropItem(newListData);
    },
    [startIndex, listData, onDropItem]
  );

  return (
    <ul className="sortable-list">
      {listData.map((item, index) => (
        <SortableListItem
          key={index}
          index={index}
          draggable={true}
          onDropItem={onDrop}
          onDragStart={onDragStart}
          onClickItem={onClickItem}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDropItem={onDrop}
      />
    </ul>
  );
};

export default SortableList;
