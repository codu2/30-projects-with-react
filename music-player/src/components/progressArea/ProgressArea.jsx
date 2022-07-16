import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
  useCallback,
  memo,
} from "react";
import "./ProgressArea.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";

const ProgressArea = (props, ref) => {
  const audio = useRef();
  const dispatch = useDispatch();
  const progressBar = useRef();
  const { playList, currentIndex, repeat } = useSelector(
    (state) => ({
      playList: state.playList,
      currentIndex: state.currentIndex,
      repeat: state.repeat,
    }),
    shallowEqual
  );
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
    resetDuration: () => {
      // 한 곡 반복을 위한 함수
      audio.current.currentTime = 0;
    },
  }));

  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);

  const getTime = useCallback((time) => {
    const minute = `0${parseInt(time / 60, 10)}`;
    const seconds = `0${parseInt(time % 60)}`;
    return `${minute}:${seconds.slice(-2)}`;
    // seconds가 059 이면 slice()를 이용해 마지막에서부터 2개의 값만 return
  }, []);

  const onClickProgress = useCallback((event) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    // progress bar의 전체 width
    const offsetX = event.nativeEvent.offsetX;
    // progress bar를 기준으로 click된 위치
    const duration = audio.current.duration;
    audio.current.currentTime = (offsetX / progressBarWidth) * duration;
    // audio의 currentTime을 click한 지점으로 주기 위해
    // progress bar에서 click된 위치를 progress bar의 전체 길이로 나누고
    // 그것에 duration을 곱해 현재 audio의 duration 기준 어느 지점으로 바꿔야 하는지 알아내어 값을 넣어줌
    // audio.current.currentTime 값을 변경하면 audio에서 자동으로 onTimeUpdate 이벤트가 일어남
    // 수동으로 progress bar의 width를 변경해줄 필요가 없음
  }, []);

  const onTimeUpdate = useCallback(
    (event) => {
      if (event.target.readyState === 0) {
        // 음악을 재생할 준비가 안된 상태
        return;
      }
      const currentTime = event.target.currentTime;
      const duration = event.target.duration;
      // 초 단위
      const progressBarWidth = (currentTime / duration) * 100;
      // currentTime이 업데이트 될 때마다 percentage로 progress bar의 width를 줌
      progressBar.current.style.width = `${progressBarWidth}%`;
      setCurrentTime(getTime(currentTime));
      setDuration(getTime(duration));
    },
    [getTime]
  );

  const onPause = useCallback(() => {
    dispatch(stopMusic());
  }, [dispatch]);

  const onEnded = useCallback(() => {
    if (repeat === "ONE") {
      audio.current.currentTime = 0;
      // 이미 곡이 끝난 상태이므로 다시 play 해줘야 함
      audio.current.play();
    } else {
      dispatch(nextMusic());
    }
  }, [repeat, dispatch]);

  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          ref={audio}
          src={playList[currentIndex].src}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default memo(forwardRef(ProgressArea));
