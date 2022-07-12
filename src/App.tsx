import { useCallback, useState } from "react";
import "./App.css";
import ImageBox from "./components/ImageBox";
import { useDropzone } from "react-dropzone";

function App() {
  //const inpRef = useRef<HTMLInputElement>(null);

  const [imageList, setImageList] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: string | any[]) => {
    if (acceptedFiles.length) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (event) => {
          setImageList((prev) => [...prev, event.target?.result as string]);
        };
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container">
      <div className={`gallery-box ${imageList.length > 0 && "row"}`}>
        {imageList.length === 0 && (
          <div className="text-center">
            이미지가 없습니다.
            <br />
            이미지를 추가해주세요.
          </div>
        )}
        {imageList.map((image, index) => (
          <ImageBox key={image + index} src={image} />
        ))}
        <div className="plus-box" {...getRootProps()}>
          <input {...getInputProps()} />+
        </div>
      </div>
    </div>
  );
}

export default App;

/*
drag&drop 기능이 없는 코드

<div
  className="plus-box"
  onClick={() => {
    inpRef.current?.click();
  }}
>
  <input
    type="file"
    ref={inpRef}
    onChange={(event) => {
      if (event.currentTarget.files?.[0]) {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (event) => {
          setImageList([...imageList, event.target?.result as string]);
        };
      }
    }}
  />
  +
</div>
*/
