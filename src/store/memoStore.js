// mobx

import { action, autorun, makeObservable, observable } from "mobx";
import { v1 as uuidv1 } from "uuid";

// memo model
export class MemoModel {
  id = uuidv1();
  content = "";
  x = 0;
  y = 0;
  width = 250;
  height = 300;

  constructor() {
    makeObservable(this, {
      content: observable,
      x: observable,
      y: observable,
      width: observable,
      height: observable,
    });
  }
}

// memo store
export default class MemoStore {
  id = "memoStore";
  localStorage = null;
  memos = [];

  constructor() {
    makeObservable(this, {
      memos: observable,
      addMemo: action,
      editMemo: action,
      setWidthHeight: action,
      setPosition: action,
      deleteMemo: action,
      loadLocalStorage: action,
    });

    // localStorage 불러오기
    this.initLocalStorage();

    // localStorage에 저장하기
    autorun(() => {
      if (this.localStorage !== null) {
        this.localStorage.setItem(this.id, JSON.stringify(this.memos));
      }
    });
  }

  addMemo() {
    this.memos.push(new MemoModel());
  }

  editMemo(id, content) {
    // content는 새로운 내용을 가지고 있음
    this.memos[this.getMemoIndex(id)].content = content;
  }

  getMemoIndex(id) {
    return this.memos.findIndex((memo) => memo.id === id);
  }
  // memos 자체에 영향을 주지 않기 때문에 makeObservable에 action이라고 정의할 필요 없음

  setWidthHeight(id, width, height) {
    const index = this.getMemoIndex(id);
    this.memos[index].width = width;
    this.memos[index].height = height;
  }

  setPosition(id, x, y) {
    const index = this.getMemoIndex(id);
    this.memos[index].x = x;
    this.memos[index].y = y;
  }

  deleteMemo(id) {
    this.memos.splice(this.getMemoIndex(id), 1);
  }

  initLocalStorage() {
    if (window.localStorage[this.id] == null) {
      this.localStorage = window.localStorage;
      this.localStorage.setItem(this.id, JSON.stringify(this.memos.shift()));
    } else {
      this.localStorage = window.localStorage;
      this.loadLocalStorage();
    }
  }

  loadLocalStorage() {
    this.memos = JSON.parse(this.localStorage.getItem(this.id));
  }
}
