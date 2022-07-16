import React, { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Controls.scss";
import {
  nextMusic,
  prevMusic,
  setRepeat,
} from "../../store/musicPlayerReducer";

const RepeatButton = memo(({ repeat, ...props }) => {
  switch (repeat) {
    case "ALL":
      return <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />;
    case "ONE":
      return (
        <RepeatOneIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    case "SHUFFLE":
      return (
        <ShuffleIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    default:
      return null;
  }
});
// ...props는 onclick 이벤트를 각 icon 들로 전달해줌

const Controls = ({
  setShowPlayList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {
  const playing = useSelector((state) => state.playing);
  const repeat = useSelector((state) => state.repeat);
  const dispatch = useDispatch();

  const onClickPlay = useCallback(() => {
    play();
  }, [play]);

  const onClickPause = useCallback(() => {
    pause();
  }, [pause]);

  const onChangeVolume = useCallback(
    (event) => {
      changeVolume(event.target.value);
    },
    [changeVolume]
  );

  const onClickPrevious = useCallback(() => {
    // Controls가 리렌더링 될 때 함수가 재생성되는데, 이때 repeat의 상태가 최신임을 보장해주기 위해 useCallback 사용
    if (repeat === "ONE") {
      resetDuration();
    } else {
      dispatch(prevMusic());
    }
  }, [repeat, resetDuration, dispatch]);

  const onClickNext = useCallback(() => {
    if (repeat === "ONE") {
      resetDuration();
    } else {
      dispatch(nextMusic());
    }
  }, [repeat, resetDuration, dispatch]);
  // 다음 곡이나 이전 곡으로 넘어갈 때 repeat의 상태를 적용해서 구현해야 함
  // repeat이 그냥 all 인지, one 인지, shuffle 인지

  const onClickRepeat = useCallback(() => {
    dispatch(setRepeat());
  }, [dispatch]);

  const onClickShowPlayList = useCallback(() => {
    setShowPlayList(true);
  }, [setShowPlayList]);

  return (
    <div className="control-area">
      <QueueMusic
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickShowPlayList}
      />
      <RepeatButton repeat={repeat} onClick={onClickRepeat} />
      <SkipPrevious
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickPrevious}
      />
      {playing ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPause}
        />
      ) : (
        <PlayArrow
          className="play"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPlay}
        />
      )}
      <SkipNext
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickNext}
      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default memo(Controls);
