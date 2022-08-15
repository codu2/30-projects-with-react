import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";

const CarouselContainer = styled.div<{
  direction: "row" | "column";
}>`
  width: 500px;
  height: 500px;
  background-color: ghostwhite;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: ${({ direction }) => direction};
`;

const CarouselItem = styled.div<{
  offset: number;
  transitionTime: number;
  direction: "row" | "column";
}>`
  width: 500px;
  height: 500px;
  min-width: 500px;
  min-height: 500px;
  transform: translate${({ direction }) => (direction === "row" ? "X" : "Y")}(${({ offset }) => -(offset * 100)}%);
  transition: transform ${({ transitionTime }) => transitionTime}ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselButton = styled.div<{
  position: "left" | "right";
  direction: "row" | "column";
}>`
  width: 50px;
  height: 50px;
  background-color: #555;
  color: #fff;
  position: absolute;
  top: ${({position, direction}) => direction === "row" ? "calc(50% - 25px)" : position === 'left' ? "0" : "calc(100% - 50px)"};
  ${({ position, direction }) => position === "left" && `left : ${direction === 'row' ? 0 : "calc(50% - 25px)"}`};
  ${({ position, direction }) => position === "right" && `right : ${direction === 'row' ? 0 : "calc(50% - 25px)"}`};
  //(화살표)${({direction}) => direction === "column" && 'transform : rotate(90deg)'};
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
`;

interface CarouselProps {
  children: ReactNode | ReactNode[];
  loop?: boolean;
  autoLoop?: boolean;
  autoTime?: number;
  transitionTime?: number;
  direction?: "row" | "column";
}

const Carousel = ({
  children: propschildren,
  loop,
  autoLoop,
  autoTime = 3000,
  transitionTime = 500,
  direction = "row",
}: CarouselProps) => {
  // props.children 안에 div가 두개 이상이면 배열로 받게 되고
  // 하나라면 객체로 받게 되는데
  // 모든 상황에서 배열이 될 수 있도록 Array.isArray로 props.children이
  // 배열인지 객체인지 확인해준 다음
  // 배열이라면 그대로, 배열이 아니라면 [] 안에 넣어 배열로 만들어줌
  const children = Array.isArray(propschildren)
    ? propschildren
    : [propschildren];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (autoLoop) {
      const intv = setInterval(() => {
        setIdx((prev) => (prev < children.length - 1 ? prev + 1 : 0));
      }, autoTime);

      return () => clearInterval(intv);
    }
  }, [autoLoop, autoTime, children.length]);

  return (
    <CarouselContainer direction={direction}>
      <CarouselButton
        direction={direction}
        position="left"
        onClick={() => {
          if (idx > 0) setIdx((prev) => prev - 1);
          else if (loop) {
            setIdx(children.length - 1);
          }
        }}
      >
        {direction === "row" ? "L" : "T"}
      </CarouselButton>
      {children.map((child, index) => (
        <CarouselItem
          offset={idx}
          transitionTime={transitionTime}
          direction={direction}
          key={index}
        >
          {child}
        </CarouselItem>
      ))}
      <CarouselButton
        direction={direction}
        position="right"
        onClick={() => {
          if (children.length - 1 > idx) {
            setIdx((prev) => prev + 1);
          } else if (loop) {
            setIdx(0);
          }
        }}
      >
        {direction === "row" ? "R" : "B"}
      </CarouselButton>
    </CarouselContainer>
  );
};

export default Carousel;
