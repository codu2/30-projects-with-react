import React, { memo, useCallback } from "react";
import "./PlayList.scss";
import classNames from "classnames";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import { useSelector, useDispatch } from "react-redux";
import SortableList from "@billy-fe/sortable-list";
import {
  setCurrentIndex,
  updatePlayList,
} from "../../store/musicPlayerReducer";

const PlayList = ({ showPlayList, setShowPlayList }) => {
  const playList = useSelector((state) => state.playList);
  const dispatch = useDispatch();

  const onClickClosePlayList = useCallback(() => {
    setShowPlayList(false);
  }, [setShowPlayList]);

  const onClickItem = useCallback(
    (index) => {
      dispatch(setCurrentIndex(index));
      // audio 태그의 src는 playList[currentIndex].src 이므로
      // currentIndex를 변경해줬기 때문에 곡이 바뀜
    },
    [dispatch]
  );

  const onDropItem = useCallback(
    (newPlayList) => {
      dispatch(updatePlayList(newPlayList));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (item, index) => <PlayListItem item={item} index={index} />,
    []
  );

  return (
    <div className={classNames("play-list", { show: showPlayList })}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play List</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: "pointer" }}
          onClick={onClickClosePlayList}
        />
      </div>
      <SortableList
        data={playList}
        onDropItem={onDropItem}
        onClickItem={onClickItem}
        renderItem={renderItem}
      />
    </div>
  );
};

export default memo(PlayList);

/*
 <ul>
  {playList.map((item, index) => (
    <li key={index}>
      <PlayListItem item={item} index={index} />
    </li>
  ))}
  </ul>
*/
