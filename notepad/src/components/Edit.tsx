import { useState } from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import Cookies from "js-cookie";
import Memo from "../interfaces/Memo";

const TitleInput = styled.input``;

const ContentsInput = styled.textarea`
  height: 360px;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

interface EditProps {
  setMode: (mode: "edit" | "view") => void;
  selectedMemoIdx: number | null;
}

const Edit = ({ setMode, selectedMemoIdx }: EditProps) => {
  const [title, setTitle] = useState(() => {
    if (Number.isInteger(selectedMemoIdx)) {
      const memo = JSON.parse((Cookies.get("memo") ?? null)!);
      const memoList: Memo[] = memo ?? [];
      return memoList[selectedMemoIdx as number].title;
    }
    return "";
  });
  const [contents, setContents] = useState(() => {
    if (Number.isInteger(selectedMemoIdx)) {
      const memo = JSON.parse((Cookies.get("memo") ?? null)!);
      const memoList: Memo[] = memo ?? [];
      return memoList[selectedMemoIdx as number].contents;
    }
    return "";
  });

  return (
    <EditContainer>
      <TitleInput
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <ContentsInput
        value={contents}
        onChange={(event) => setContents(event.currentTarget.value)}
      />
      <ButtonContainer>
        <Button onClick={() => setMode("view")}>뒤로가기</Button>
        <Button
          onClick={() => {
            if (!(title.length && contents.length)) {
              alert("제목과 내용을 모두 적어주세요.");
              return;
            }
            // title과 contents가 둘 다 비어있지 않은 상태가 아닐 때, 즉 둘 다 비어있거나 둘 중 하나라도 비어있는 상태일 때

            const memo = JSON.parse((Cookies.get("memo") ?? null)!);
            const memoList: Memo[] = memo ?? [];
            // ?? 연산자는 앞의 값이 아닐 때 대체할 수 있는 값을 오른쪽에 넣어줌

            if (Number.isInteger(selectedMemoIdx)) {
              memoList[selectedMemoIdx as number] = {
                title,
                contents,
              };
            } else {
              memoList.push({
                title,
                contents,
              });
            }

            Cookies.set("memo", JSON.stringify(memoList));

            alert("저장되었습니다.");
            setMode("view");
          }}
        >
          저장
        </Button>
      </ButtonContainer>
    </EditContainer>
  );
};

export default Edit;
