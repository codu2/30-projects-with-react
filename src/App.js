import SortableList from "../src/lib/SortableList";
import { data } from "../src/TestItem/TestData";
import TestItem from "../src/TestItem/TestItem";

function App() {
  const onDropItem = (newList) => console.log(newList);

  const onClickItem = (index) => {
    alert(index);
  };

  return (
    <SortableList
      data={data}
      renderItem={(item, index) => <TestItem data={item} index={index} />}
      onDropItem={onDropItem}
      onClickItem={onClickItem}
    />
  );
}

export default App;
