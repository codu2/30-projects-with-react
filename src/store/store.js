import { atom } from "recoil";

export const timeTableState = atom({
  key: "timeTableState",
  default: {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
  },
});
