import { atom } from "recoil";

export const timeTableState = atom({
  key: "timeTableState",
  default: {
    mon: [{ start: 9, end: 11, name: "교양", color: "yellow", id: 1 }],
    tue: [{ start: 10, end: 13, name: "교양1", color: "red", id: 2 }],
    wed: [{ start: 12, end: 14, name: "교양2", color: "green", id: 3 }],
    thu: [{ start: 9, end: 10, name: "교양3", color: "blue", id: 4 }],
    fri: [{ start: 13, end: 17, name: "교양4", color: "purple", id: 5 }],
  },
});
