import { useState, useCallback, useEffect } from "react";
import Box from "../components/Box";
import Editor from "../components/Editor";
import Button from "../components/Button";
import Flex from "../components/Flex";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/${id}`);
        setEdit(data.content);
      } catch (error) {
        alert((error as any).response.data.msg);
        navigate("/");
      }
    })();
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await axios.put(`/${id}`, {
        content: edit,
      });
      alert("수정되었습니다.");
      navigate(`/${id}`);
    } catch (error) {
      alert((error as any).response.data.msg);
      navigate("/");
    }
  }, [edit, id]);

  if (edit === null) {
    return <></>;
  }

  return (
    <Box p="16px">
      <h3>ID : {id}</h3>
      <Editor value={edit} onChange={setEdit} />
      <Flex style={{ gap: "8px" }} justifyContent="flex-end">
        <Button mt="8px" onClick={handleSubmit}>
          UPDATE
        </Button>
        <Button mt="8px" onClick={() => navigate(`/${id}`)}>
          CANCLE
        </Button>
      </Flex>
    </Box>
  );
};

export default EditPage;
