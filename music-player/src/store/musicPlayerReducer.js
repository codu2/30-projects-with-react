import img1 from "../images/music-1.jpg";
import img2 from "../images/music-2.jpg";
import img3 from "../images/music-3.jpg";
import img4 from "../images/music-4.jpg";
import img5 from "../images/music-5.jpg";
import music1 from "../music/music-1.mp3";
import music2 from "../music/music-2.mp3";
import music3 from "../music/music-3.mp3";
import music4 from "../music/music-4.mp3";
import music5 from "../music/music-5.mp3";

const playList = [
  {
    name: "Lofi Study",
    artist: "FASSounds",
    img: img1,
    src: music1,
    id: 1,
  },
  {
    name: "That Background Ambient",
    artist: "AudioCoffee",
    img: img2,
    src: music2,
    id: 2,
  },
  {
    name: "Trendy Summer Pop",
    artist: "PavelYudin",
    img: img3,
    src: music3,
    id: 3,
  },
  {
    name: "The Cradle of Your Soul",
    artist: "lemonmusicstudio",
    img: img4,
    src: music4,
    id: 4,
  },
  {
    name: "Whip",
    artist: "prazkhanal",
    img: img5,
    src: music5,
    id: 5,
  },
];

// initial state
const initialState = {
  playList,
  currentMusicId: playList[0].id,
  currentIndex: 0,
  playing: false,
  repeat: "ALL", // ONE, SHUFFLE
};

const repeatMode = ["ONE", "ALL", "SHUFFLE"];

// action type
const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
const STOP_MUSIC = "musicPlayer/STOP_MUSIC";
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
const PREV_MUSIC = "musicPlayer/PREV_MUSIC";
const SET_REPEAT = "musicPlayer/SET_REPEAT";
const SET_CURRENT_INDEX = "musicPlayer/SET_CURRENT_INDEX";
const UPDATE_PLAYLIST = "musicPlayer/UPDATE_PLAYLIST";

// action creator
export const playMusic = () => ({ type: PLAY_MUSIC });
export const stopMusic = () => ({ type: STOP_MUSIC });
export const nextMusic = () => ({ type: NEXT_MUSIC });
export const prevMusic = () => ({ type: PREV_MUSIC });
export const setRepeat = () => ({ type: SET_REPEAT });
export const setCurrentIndex = (index) => ({
  type: SET_CURRENT_INDEX,
  payload: index,
});
export const updatePlayList = (newPlayList) => ({
  type: UPDATE_PLAYLIST,
  payload: newPlayList,
});

// reducer
const getRandomNum = (arr, excludeNum) => {
  // 재생 목록 인덱스 배열을 받아 현재 재생 중인 곡을 제외하고 나머지 배열에서 랜덤으로 하나의 인덱스를 뽑아냄
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber] === excludeNum
    ? getRandomNum(arr, excludeNum)
    : arr[randomNumber];
};
// arr 인덱스 배열은 playList의 length를 기반으로 0부터 시작하는 배열

const musicPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playing: true,
      };
    case STOP_MUSIC:
      return {
        ...state,
        playing: false,
      };
    case NEXT_MUSIC:
      const nextIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex + 1) % state.playList.length;
      return {
        ...state,
        currentIndex: nextIndex,
        currentMusicId: state.playList[nextIndex].id,
      };
    case PREV_MUSIC:
      const prevIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex - 1 + state.playList.length) %
            state.playList.length;
      return {
        ...state,
        currentIndex: prevIndex,
        currentMusicId: state.playList[prevIndex].id,
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat:
          repeatMode[
            (repeatMode.indexOf(state.repeat) + 1) % repeatMode.length
          ],
      };
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload,
        currentMusicId: state.playList[action.payload].id,
      };
    case UPDATE_PLAYLIST:
      return {
        ...state,
        playList: action.payload,
        currentIndex: action.payload.findIndex(
          (music) => music.id === state.currentMusicId
        ),
        // sorting 하면서 index가 바뀌었으므로 currentIndex를 찾아줘야 함
      };
    default:
      return state;
  }
};

export default musicPlayerReducer;
