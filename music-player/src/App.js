import React, { useRef, useState, useCallback } from "react";
import "./App.scss";
import Controls from "./components/controls/Controls";
import PlayList from "./components/playlist/PlayList";
import ProgressArea from "./components/progressArea/ProgressArea";
import SongDetail from "./components/songDetail/SongDetail";

function App() {
  const audioRef = useRef();
  const [showPlayList, setShowPlayList] = useState(false);

  const onPlay = useCallback(() => {
    audioRef.current.play();
  }, []);

  const onPause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume);
  }, []);

  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
          setShowPlayList={setShowPlayList}
        />
        <PlayList
          showPlayList={showPlayList}
          setShowPlayList={setShowPlayList}
        />
      </div>
    </div>
  );
}

export default App;
