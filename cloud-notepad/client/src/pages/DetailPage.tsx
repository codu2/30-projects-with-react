import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Flex from "../components/Flex";
import Box from "../components/Box";
import Note from "../interfaces/Note";
import {
  VscChevronLeft,
  VscCopy,
  VscEdit,
  VscTrash,
  VscLiveShare,
} from "react-icons/vsc";
import Button from "../components/Button";
import CopyToClipboard from "react-copy-to-clipboard";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/${id}`);
        setNote(data);
      } catch (error) {
        alert((error as any).response.data.msg);
        navigate("/");
      }
    })();
  }, []);

  if (note === null) {
    return <></>;
  }

  return (
    <Box p="12px">
      <Flex justifyContent="space-between">
        <Button square onClick={() => navigate("/")}>
          <VscChevronLeft style={{ width: "18px", height: "18px" }} />
        </Button>
        <Flex style={{ gap: "8px" }}>
          <Button square onClick={() => navigate("edit")}>
            <VscEdit style={{ width: "18px", height: "18px" }} />
          </Button>
          <Button
            square
            onClick={() => {
              window.navigator.share({
                title: "cloud notepad share",
                text: note.content,
                url: window.location.href,
              });
              //https에서만 작동
            }}
          >
            <VscLiveShare style={{ width: "18px", height: "18px" }} />
          </Button>
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => {
              alert("복사되었습니다.");
            }}
          >
            <Button square>
              <VscCopy style={{ width: "18px", height: "18px" }} />
            </Button>
          </CopyToClipboard>
          <Button
            square
            onClick={async () => {
              if (window.confirm("삭제하시겠습니까?")) {
                try {
                  await axios.delete(`/${id}`);
                  alert("삭제되었습니다.");
                } catch (error) {
                  alert((error as any).response.data.msg);
                }
                navigate("/");
              }
            }}
          >
            <VscTrash style={{ width: "18px", height: "18px" }} />
          </Button>
        </Flex>
      </Flex>
      <Flex border={"1px solid #ccc"} p="12px" my="8px" flexDirection="column">
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
    </Box>
  );
};

export default DetailPage;
