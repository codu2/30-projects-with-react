import { useCallback, useEffect, useState } from "react";
import Box from "../components/Box";
import axios from "axios";
import Button from "../components/Button";
import Note from "../interfaces/Note";
import Flex from "../components/Flex";
import { useNavigate } from "react-router-dom";
import { VscChevronLeft } from "react-icons/vsc";

const ManagerPage = () => {
  const navigate = useNavigate();
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [selectedNoteList, setSelectedNoteList] = useState<number[]>([]);

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = useCallback(async () => {
    const { data } = await axios.get<Note[]>("/");
    setNoteList(data);
  }, [setNoteList]);

  return (
    <Box p="16px">
      <Button square onClick={() => navigate("/")}>
        <VscChevronLeft style={{ width: "20px", height: "20px" }} />
      </Button>
      <h3>Cloud Notepad Manager</h3>
      <Flex style={{ gap: "8px" }}>
        <Button
          onClick={() => {
            setSelectedNoteList(
              noteList.length === selectedNoteList.length
                ? []
                : noteList.map((note) => note.id)
            );
          }}
        >
          {noteList.length === selectedNoteList.length
            ? "Deselect All"
            : " Select All"}
        </Button>
        <Button
          onClick={async () => {
            if (selectedNoteList.length === 0) {
              alert("note를 선택헤주세요.");
              return;
            }
            const list = [];
            for (const id of selectedNoteList) {
              list.push(axios.delete(`/${id}`));
            }
            await Promise.all(list);
            await loadNote();
            alert("삭제되었습니다.");
          }}
        >
          Delete Selected
        </Button>
        <Button
          onClick={async () => {
            if (!window.confirm("전체 삭제하시겠습니까?")) {
              return;
            }
            await axios.delete("/");
            await loadNote();
            alert("삭제되었습니다.");
          }}
        >
          Delete All
        </Button>
      </Flex>
      {noteList.map((note) => (
        <Flex
          key={note.created_at}
          border="1px solid #ccc"
          borderWidth={selectedNoteList.includes(note.id) ? "4px" : "1px"}
          p="12px"
          my="8px"
          flexDirection="column"
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSelectedNoteList((prev) => {
              if (prev.includes(note.id)) {
                return prev.filter((id) => note.id !== id);
              }
              return [...prev, note.id];
            })
          }
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

export default ManagerPage;
