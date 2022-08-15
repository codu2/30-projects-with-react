import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    // setSelf - store 값을 스스로 set하는 기능, onSet - localStorage가 변경되었을 때 실행
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // newValue - 새로운 값, _ - 기존 값, isReset - reset 여부를 알려주는 boolean 값
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const timeTableState = atom({
  key: "timeTableState",
  default: {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
  },
  effects: [localStorageEffect("timeTable")],
});
