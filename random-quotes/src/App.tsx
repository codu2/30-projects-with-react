import { useEffect, useState } from "react";
import Box from "./components/Box";
import Flex from "./components/Flex";
import {
  VscListUnordered,
  VscArrowLeft,
  VscAdd,
  VscEdit,
  VscTrash,
  VscClose,
  VscCheck,
} from "react-icons/vsc";
import axios from "axios";
import Data from "./interfaces/Data";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [page, setPage] = useState<"main" | "edit">("main");
  const [nowData, setNowData] = useState<null | Data>(null);
  const [dataList, setDataList] = useState<null | Data[]>(null);
  const [error, setError] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [createInp, setCreateInp] = useState<Data>({
    author: "",
    message: "",
  });
  const [selectedData, setSelectedData] = useState<string>("");
  const [editInp, setEditInp] = useState<Data>({
    author: "",
    message: "",
  });

  useEffect(() => {
    if (page === "main") {
      axios
        .get("/random")
        .then((response) => setNowData(response.data))
        .catch(() => setError("명언을 불러오지 못했습니다."));
    } else {
      axios
        .get("/")
        .then((response) => setDataList(response.data))
        .catch(() => setError("명언을 불러오지 못했습니다."));
    }
  }, [page]);

  if (page === "main") {
    return (
      <>
        <Flex
          position={"fixed"}
          right={["16px", "64px", "64px"]}
          top={["16px", "64px", "64px"]}
        >
          <Flex
            bg={"#23cd34"}
            width={"48px"}
            height={"48px"}
            borderRadius={"4px"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => setPage("edit")}
          >
            <VscListUnordered color="#fff" fontSize={"28px"} />
          </Flex>
        </Flex>
        <Flex
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          px={"16px"}
        >
          <Box fontSize={"24px"}> 오늘의 명언</Box>
          <Flex
            px={"16px"}
            overflowX={"scroll"}
            alignItems={"center"}
            justifyContent={"center"}
            fontSize={"24px"}
            width={"100%"}
            height={"160px"}
            border={"1px solid #707070"}
            mt={"64px"}
            mb={"16px"}
            textAlign="center"
          >
            {error.length > 0 && error}
            <Box
              width={"100%"}
              style={{
                whiteSpace: "pre",
              }}
            >
              {nowData?.message}
              {"  "}
            </Box>
          </Flex>
          <Box fontSize={"24px"}>{nowData?.author}</Box>
        </Flex>
      </>
    );
  }
  return (
    <Flex pt={"64px"} pl={["16px", "64px", "64px"]} flexDirection={"column"}>
      <Flex pb={"44px"} style={{ gap: "44px" }}>
        <Flex
          bg={"#23cd34"}
          width={"48px"}
          height={"48px"}
          borderRadius={"4px"}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => setPage("main")}
        >
          <VscArrowLeft color="#fff" fontSize={"28px"} />
        </Flex>
        <Flex
          bg={"#8400f9"}
          width={"48px"}
          height={"48px"}
          borderRadius={"4px"}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => setCreateMode((prev) => !prev)}
        >
          {createMode ? (
            <VscClose color="#fff" fontSize={"28px"} />
          ) : (
            <VscAdd color="#fff" fontSize={"28px"} />
          )}
        </Flex>
      </Flex>

      {dataList?.map((data, index) => (
        <Flex
          key={data.message}
          width={["95%", "416px", "416px"]}
          height={"48px"}
          mb={"16px"}
        >
          <Flex
            border={"1px solid #707070"}
            flex={1}
            overflowX={"scroll"}
            style={{ whiteSpace: "pre" }}
            px={"4px"}
            py={"4px"}
          >
            {data.message === selectedData ? (
              <>
                <input
                  placeholder="author"
                  name="author"
                  value={editInp.author}
                  onChange={(e) =>
                    setEditInp((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  style={{ width: "40%", border: "none", outlineColor: "#ddd" }}
                  autoComplete="off"
                />
                <input
                  placeholder="message"
                  name="message"
                  value={editInp.message}
                  onChange={(e) =>
                    setEditInp((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  style={{ width: "60%", border: "none", outlineColor: "#ddd" }}
                  autoComplete="off"
                />
              </>
            ) : (
              `[${data.author}] ${data.message}  `
            )}
          </Flex>
          <Flex
            bg={"#2699fb"}
            width={"48px"}
            height={"48px"}
            borderRadius={"4px"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => {
              if (data.message === selectedData) {
                axios.put(`/${index}`, editInp).then(({ data }) => {
                  if (data.rs) {
                    setDataList([]);
                    setEditInp({ author: "", message: "" });
                    setSelectedData("");
                    alert("수정되었습니다.");
                    axios
                      .get("/")
                      .then((response) => setDataList(response.data))
                      .catch(() => setError("명언을 불러오지 못했습니다."));
                  } else {
                    alert("다시 시도해주세요.");
                  }
                });
              } else {
                setSelectedData(data.message);
                setEditInp({
                  author: data.author,
                  message: data.message,
                });
              }
            }}
          >
            {data.message === selectedData ? (
              <VscCheck color="#fff" fontSize={"28px"} />
            ) : (
              <VscEdit color="#fff" fontSize={"28px"} />
            )}
          </Flex>
          <Flex
            bg={"#ff0c0c"}
            width={"48px"}
            height={"48px"}
            borderRadius={"4px"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => {
              if (window.confirm("해당 명언을 제거하시겠습니까?")) {
                axios.delete(`/${index}`).then(({ data }) => {
                  if (data.rs) {
                    setDataList([]);
                    alert("삭제되었습니다.");
                    axios
                      .get("/")
                      .then((response) => setDataList(response.data))
                      .catch(() => setError("명언을 불러오지 못했습니다."));
                  } else {
                    alert("다시 시도해주세요.");
                  }
                });
              }
            }}
          >
            <VscTrash color="#fff" fontSize={"28px"} />
          </Flex>
        </Flex>
      ))}
      {createMode && (
        <Flex width={"416px"} height={"48px"} mb={"16px"}>
          <Flex
            border={"1px solid #707070"}
            flex={1}
            overflowX={"scroll"}
            style={{ whiteSpace: "pre" }}
            px={"4px"}
            py={"4px"}
          >
            <input
              placeholder="author"
              name="author"
              value={createInp.author}
              onChange={(e) =>
                setCreateInp((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              style={{ width: "40%", border: "none", outlineColor: "#ddd" }}
              autoComplete="off"
            />
            <input
              placeholder="message"
              name="message"
              value={createInp.message}
              onChange={(e) =>
                setCreateInp((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              style={{ width: "60%", border: "none", outlineColor: "#ddd" }}
              autoComplete="off"
            />
          </Flex>
          <Flex
            bg={"#2699fb"}
            width={"48px"}
            height={"48px"}
            borderRadius={"4px"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={() => {
              if (
                createInp.author.length === 0 ||
                createInp.message.length === 0
              ) {
                alert("author와 message를 모두 입력해주세요.");
                return;
              }

              axios.post("/", createInp).then(({ data }) => {
                if (data.rs) {
                  setDataList([]);
                  setCreateInp({ author: "", message: "" });
                  setCreateMode(false);
                  alert("추가되었습니다.");
                  axios
                    .get("/")
                    .then((response) => setDataList(response.data))
                    .catch(() => setError("명언을 불러오지 못했습니다."));
                } else {
                  alert("다시 시도해주세요.");
                }
              });
            }}
          >
            <VscCheck color="#fff" fontSize={"28px"} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default App;
