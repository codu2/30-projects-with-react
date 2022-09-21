const express = require("express");
const fs = require("fs"); // 파일을 불러오기 위해
const cors = require("cors");

const app = express();

let tmp = "";

const data = JSON.parse(fs.readFileSync("data.json", "utf-8")); // 인코딩 타입 utf-8

app.use(express.json());
app.use(cors());

function save() {
  fs.writeFileSync("data.json", JSON.stringify(data), "utf-8");
}

app.get("/", (req, res) => {
  res.json(data.filter((d) => d.deleted_at === null));
});

// 임시저장 가져오기
app.get("/tmp", (req, res) => {
  res.json({
    rs: tmp,
  });
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id); // string -> number
  if (isNaN(id) || data.length <= id || id < 0) {
    res.status(400).json({
      msg: "잘못된 id 입니다.",
    });
    return;
  }
  if (data[id].deleted_at !== null) {
    res.status(404).json({
      msg: "이미 삭제된 note 입니다.",
    });
    return;
  }

  res.json(data[id]);
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || data.length <= id || id < 0) {
    res.status(400).json({
      msg: "잘못된 id 입니다.",
    });
    return;
  }

  if (data[id].deleted_at !== null) {
    res.status(404).json({
      msg: "이미 삭제된 note 입니다.",
    });
    return;
  }

  data[id].deleted_at = Date.now(); // 삭제했음을 알려줌과 동시에 삭제한 시간도 저장

  res.json(data[id]);

  save();
});

app.delete("/", (req, res) => {
  const list = []; // 삭제된 note들만

  for (const note of data) {
    if (note.deleted_at === null) {
      note.deleted_at = Date.now();
      list.push(note);
    }
  }

  res.json(list);

  save();
});

app.post("/", (req, res) => {
  const { content } = req.body;
  if (!content || content.length === 0) {
    res.status(400).json({
      msg: "content가 없습니다.",
    });
    return;
  }

  const note = {
    content: content,
    created_at: Date.now(),
    updated_at: null,
    deleted_at: null,
  };

  data.push(note);

  res.json(note);

  save();
});

// 임시저장 기능
app.post("/tmp", (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({
      msg: "content가 없습니다.",
    });
    return;
  }

  tmp = content;

  res.json({
    rs: true,
  });
});

app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;

  if (isNaN(id) || data.length <= id || id < 0) {
    res.status(400).json({
      msg: "잘못된 id 입니다.",
    });
    return;
  }

  if (!content || content.length === 0) {
    res.status(400).json({
      msg: "content가 없습니다.",
    });
    return;
  }

  if (data[id].deleted_at !== null) {
    res.status(404).json({
      msg: "이미 삭제된 note 입니다.",
    });
    return;
  }

  data[id].content = content;
  data[id].updated_at = Date.now();

  res.json(data[id]);

  save();
});

app.listen(8080, () => {
  console.log("cloud-notepad server start!");
});

// npx nodemon ./index.js
