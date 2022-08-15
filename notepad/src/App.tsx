import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Card from "./components/Card";
import Edit from "./components/Edit";
import Memo from "./interfaces/Memo";
import Cookies from "js-cookie";

const CardContainer = styled.div`
  display: center;
  gap: 32px;
  flex-wrap: wrap;
  align-items: center;
`;

const PlusCard = styled.div`
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #707070;
  cursor: pointer;
  width: 80px;
  height: 80px;
  padding-top: 4px;
  margin: 80px;
`;

function App() {
  const [mode, setMode] = useState<"edit" | "view">("view");
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [selectedMemoIdx, setSelectedMemoIdx] = useState<number | null>(null);

  useEffect(() => {
    const memo = JSON.parse((Cookies.get("memo") ?? null)!);
    const memoList: Memo[] = memo ?? [];
    setMemoList(memoList);
  }, [mode]);

  return (
    <>
      {mode === "view" && (
        <CardContainer>
          {memoList.map((memo, index) => (
            <Card
              key={index}
              title={memo.title}
              onClick={() => {
                setSelectedMemoIdx(index);
                setMode("edit");
              }}
            />
          ))}
          <PlusCard
            onClick={() => {
              setSelectedMemoIdx(null);
              setMode("edit");
            }}
          >
            +
          </PlusCard>
          <PlusCard
            onClick={() => {
              setSelectedMemoIdx(null);
              setMemoList([]);
              Cookies.remove("memo");
            }}
          >
            c
          </PlusCard>
        </CardContainer>
      )}
      {mode === "edit" && (
        <Edit setMode={setMode} selectedMemoIdx={selectedMemoIdx} />
      )}
    </>
  );
}

export default App;
