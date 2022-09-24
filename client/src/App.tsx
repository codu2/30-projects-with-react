import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes";
import { css, Global } from "@emotion/react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  return (
    <>
      <Global
        styles={css`
          .note-content img {
            max-width: 100%;
          }
        `}
      />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
