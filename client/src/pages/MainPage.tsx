import { useCallback, useEffect, useState } from "react";
import Box from "../components/Box";
import Editor from "../components/Editor";
import axios from "axios";
import Button from "../components/Button";
import Note from "../interfaces/Note";
import Flex from "../components/Flex";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState("");
  const [noteList, setNoteList] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const {
        data: { rs },
      } = await axios.get("/tmp");
      setEdit(rs);
    })();
    loadNote();
  }, []);

  useEffect(() => {
    if (edit.length > 0) {
      axios.post("/tmp", { content: edit });
    }
  }, [edit]);

  const loadNote = useCallback(async () => {
    const { data } = await axios.get<Note[]>("/");
    setNoteList(data);
  }, [setNoteList]);

  //console.log(edit.replace(/<[/\w\s"=-]*>/gi, ""));

  const handleSubmit = useCallback(async () => {
    if (edit.replace(/<[/\w\s"=-]*>/gi, "").length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const { data } = await axios.post("/", {
        content: edit,
      });
      setNoteList((prev) => [...prev, data]);
      //await loadNote();
      setEdit("");
      alert("저장되었습니다.");
    } catch (error) {
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  }, [edit]);

  return (
    <Box p="16px">
      <Flex justifyContent="space-between">
        <h3>Cloud Notepad</h3>
        <Button mt="8px" onClick={() => navigate("/manager")}>
          MANAGER
        </Button>
      </Flex>
      <Editor value={edit} onChange={setEdit} />
      <Button mt="8px" onClick={handleSubmit}>
        SAVE
      </Button>
      {noteList.map((note) => (
        <Flex
          key={note.created_at}
          border={"1px solid #ccc"}
          p="12px"
          my="8px"
          flexDirection="column"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/${note.id}`)}
        >
          <Box
            className="note-content"
            dangerouslySetInnerHTML={{
              __html: note.content,
            }}
          ></Box>
          <Box fontSize="12px" color="#555" textAlign="right">
            create : {new Date(note.created_at).toLocaleString()}
          </Box>
          {note.updated_at !== null && (
            <Box fontSize="12px" color="#555" textAlign="right">
              update : {new Date(note.updated_at).toLocaleString()}
            </Box>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default MainPage;
