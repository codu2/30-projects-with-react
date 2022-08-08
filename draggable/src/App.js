import React, { useRef } from "react";
import Draggable from "./lib/Draggable";

function App() {
  const handle = useRef(null);

  return (
    <Draggable handleRef={handle} onMove={(x, y) => console.log(x, y)}>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "ghostwhite",
        }}
      >
        <button
          ref={handle}
          style={{
            border: "none",
            backgroundColor: "#ddd",
            padding: "5px 10px",
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          Move
        </button>
      </div>
    </Draggable>
  );
}

export default App;
