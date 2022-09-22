import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  const ref = useRef("");
  const changeRef = useRef(false);
  const changeCountRef = useRef(0);
  const [post, setPost] = useState<string[]>(() => {
    const data = localStorage.getItem("data");
    if (data) {
      return JSON.parse(data);
    } else {
      localStorage.removeItem("data");
      return [];
    }
  });
  const [content, setContent] = useState<string>(() => {
    const tmp = localStorage.getItem("tmp");
    return tmp ?? "";
  });

  // content가 바뀔 때마다 localStorage에 저장
  /*
  useEffect(() => {
    if (content.length > 0) {
      localStorage.setItem("tmp", content);
    }
  }, [content]);
  */

  useEffect(() => {
    changeCountRef.current++;
    ref.current = content;
    changeRef.current = true;

    if (changeCountRef.current > 15) {
      changeCountRef.current = 0;
      changeRef.current = false;
      localStorage.setItem("tmp", ref.current);
    }
  }, [content]);

  // n초에 한번씩 localStorage에 저장
  useEffect(() => {
    const intv = setInterval(() => {
      if (changeRef.current) {
        localStorage.setItem("tmp", ref.current);
        changeRef.current = false;
        changeCountRef.current = 0;
      }
    }, 10000);

    return () => clearInterval(intv);
  }, []);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          paddingBottom: "8px",
          borderBottom: post.length > 0 ? "1px solid #ccc" : "",
        }}
      >
        <button
          onClick={() => {
            if (content.length === 0) {
              alert("내용을 입력하세요.");
              return;
            }
            localStorage.removeItem("tmp");
            setPost((prev) => {
              const rs = [...prev, content];
              localStorage.setItem("data", JSON.stringify(rs));
              return rs;
            });
            setContent("");
          }}
        >
          SAVE
        </button>
        <button
          onClick={() => {
            if (window.confirm("모두 초기화 하시겠습니까?")) {
              localStorage.clear();
              setPost([]);
            }
          }}
        >
          ALL CREAR
        </button>
        <ReactQuill
          style={{ margin: "8px" }}
          value={content}
          onChange={(value) => setContent(value)}
          modules={{
            toolbar: [
              ["image"], // image(base64)
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"], // remove formatting button
            ],
          }}
        />
      </div>
      <div>
        {post.map((post, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              margin: "8px",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
