// npm init
// npm install express
// index.js 생성

// node.js에서는 아직 es6 문법이 적용되지 않았으므로
// commonJS 방식 사용

// express에서 express를 가져와줌
const express = require("express");
// import express from 'express';

// file을 읽거나 쓰거나 제거할 때는 file system이란 뜻의 fs를 가져와야 함
const fs = require("fs");

// postman cors 문제 해결
const cors = require("cors");

// fs를 통해 서버가 켜지기 전에 바로 file을 읽어주고
// file 형식도 utf-8로 변환해주고
// string을 json 형식으로 변환하기 위해 JSON.parse로 parsing 해줌
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// express를 실행시켜 app을 만들어줌
const app = express();

// request body에서 json 파일을 받을 수 있도록 하기 위함
// 기본적으로는 body에다가 raw 데이터를 넣는 것이 허용되지 않지만
// express.json()을 실행시켜 미들웨어를 추가해주어 raw 데이터들을 적절하게 받아올 수 있도록 해줌
app.use(express.json());
app.use(cors());

// GET, POST, DELETE, PUT

app.get("/", (req, res) => {
  //res.send("hello");

  // 저자 기준, 명언 기준 필터링
  // 필터링 기준이 있을 수도 있고 없어서 모두 불러와야 할 수도 있음
  // optional 할 때에는 query string(?key=value) 이용
  const { author, message } = req.query;

  res
    .status(200)
    .json(
      data
        .filter((value) => (author ? value.author.includes(author) : true))
        .filter((value) => (message ? value.message.includes(message) : true))
    );
  // html도 바로 넣을 수 있음
  // 보통 send보다 json으로 반환을 많이 해줌
});
// 첫번째 매개변수로는 path를 넣어주고
// 두번째 매개변수로는 요청이 왔을 때 실행할, req,res 매개변수를 받는 화살표 함수를 넣어줌
// req는 request로 클라이언트가 서버에게 보낸, 서버에 들어온 요청, res는 response로 서버에 들어온 요청에 대한 응답

// 랜덤 격언 가져오기
// 순서에도 주의해야 함. id 값으로 격언을 찾는 것보다 아래에 있으면 안됨
app.get("/random", (req, res) => {
  // random한 값을 구해야 하는데
  // data의 length 길이만큼 내에서 random한 값이 나옴
  const rand = Math.floor(Math.random() * data.length);

  res.status(200).json(data[rand]);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({
      rs: false,
      msg: "Id is not number!",
    });
    return;
  }

  const num = parseInt(id);

  if (num >= data.length || num < 0) {
    res.status(400).json({
      rs: false,
      msg: "Id is not valid!",
    });
    return;
  }

  res.status(200).json(data[num]);
});

app.post("/", (req, res) => {
  const { author, message } = req.body;

  if (!(author && author.length > 0 && message && message.length > 0)) {
    res.status(400).json({
      rs: false,
    });
    return;
  }

  data.push({
    author: author,
    message: message,
  });
  res.status(200).json({
    rs: true,
  });
});

// path parameter
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({
      rs: false,
      msg: "Id is not number!",
    });
    return;
  }

  const num = parseInt(id);

  if (num >= data.length || num < 0) {
    res.status(400).json({
      rs: false,
      msg: "Id is not valid!",
    });
    return;
  }

  data.splice(num, 1);
  // delete data[num];

  res.status(200).json({
    rs: true,
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json({
      rs: false,
      msg: "Id is not number!",
    });
    return;
  }

  const num = parseInt(id);

  if (num >= data.length || num < 0) {
    res.status(400).json({
      rs: false,
      msg: "Id is not valid!",
    });
    return;
  }

  const { author, message } = req.body;

  if (!(author && author.length > 0 && message && message.length > 0)) {
    res.status(400).json({
      rs: false,
    });
    return;
  }

  data[num] = {
    author: author,
    message: message,
  };

  res.status(200).json({
    rs: true,
  });
});

// port 8080번으로 듣게 해주고 callback을 작성해줌
app.listen(8080, () => {
  console.log("start server!");
});
// node index.js로 실행되는 서버를 확인할 수 있음

// npm install nodemon
// nodemon을 설치하지 않아도
// npx nodemon index.js
// 위와 같은 명령어로 nodemon이 최신버전으로 자동으로 실행됨
