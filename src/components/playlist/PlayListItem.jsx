import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

const getDuration = (src) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const minutes = `0${parseInt(audio.duration / 60, 10)}`;
      const seconds = `0${parseInt(audio.duration % 60)}`;
      resolve(`${minutes}:${seconds.slice(-2)}`);
      // => resolve되는 값 = durationTime
    };
    audio.src = src;
    // 비동기 실행, src가 넣어진 다음에 onloadedmetadata가 실행됨
  });
};

const PlayListItem = ({ item, index }) => {
  const currentIndex = useSelector((state) => state.currentIndex);
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    const getTime = async () => {
      const durationTime = await getDuration(item.src);
      setDuration(durationTime);
    };
    getTime();
  }, [item.src]);

  return (
    <>
      <div className={classNames("row", { playing: currentIndex === index })}>
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span
        className={classNames("music-duration", {
          playing: currentIndex === index,
        })}
      >
        {duration}
      </span>
    </>
  );
};

export default PlayListItem;
