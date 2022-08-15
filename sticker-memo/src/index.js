import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MemoStore from "./store/memoStore";

ReactDOM.render(
  <React.StrictMode>
    <App store={new MemoStore()} />
  </React.StrictMode>,
  document.getElementById("root")
);
