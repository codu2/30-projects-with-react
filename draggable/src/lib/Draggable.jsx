import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Draggable.css";
import { debounce } from "underscore";

const Draggable = ({ children, handleRef, onMove, x = 0, y = 0 }) => {
  const dragRef = useRef(null); //1
  const initialX = useRef(0);
  const initialY = useRef(0);
  // draggable div 내의 x,y 좌표를 기억해두기 위한 useRef //5
  const [position, setPosition] = useState({ x, y });
  // draggable div가 이동한 위치 저장 //10

  //12
  const Move = useMemo(
    () =>
      debounce((x, y) => {
        onMove(x, y);
      }, 500),
    [onMove]
  );
  // debounce(실행할 함수, 이벤트가 끝난 후 몇 초 뒤에 실행할지 ms초)

  const onMouseMove = useCallback(
    (event) => {
      setPosition({
        x: event.clientX - initialX.current,
        y: event.clientY - initialY.current,
        // mousedown 해서 draggable div를 이동시킬 때 이동한 위치에 div의 왼쪽 꼭짓점이 아닌 mousedown한 그 위치가 오도록 하기 위해
      });
      //11

      // 마우스가 움직이는 동안 setPosition에 대한 연산이 계속 발생하고
      // onMove를 실행시키면 이동할 때마다 계속 실행됨
      // 이를 막고자 mousemove가 끝난 후(mouseup) 실행되도록 debounce를 적용시켜줌
      Move(event.clientX - initialX.current, event.clientY - initialY.current);
      //13
    },
    [Move]
  );

  //14
  const removeEvents = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", removeEvents);
    document.body.removeEventListener("mouseleave", removeEvents);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (event) => {
      const { left, top } = dragRef.current.getBoundingClientRect(); //4
      // draggable div의 왼쪽 꼭짓점 위치
      initialX.current = event.clientX - left;
      // draggable div 내의 x 좌표 //6
      initialY.current = event.clientY - top;
      // draggable div 내의 y 좌표 //7

      //draggable div가 mousedown 된 상태에서 일어나는 이벤트들 //8
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", removeEvents);
      document.body.addEventListener("mouseleave", removeEvents);
      // 마우스가 body 범위를 벗어났을 때 mouseup 한 것과 같음
    },
    [onMouseMove, removeEvents]
  );

  useEffect(() => {
    const handle = handleRef.current; //2
    handle.addEventListener("mousedown", onMouseDown); //3

    return () => {
      handle.removeEventListener("mousedown", onMouseDown); //15
      Move.cancel(); //16
      // debounce된 함수를 cancel, 즉 취소 시켜줌
      // debounce된 함수에서 이벤트를 실행시키기 전에 해당 대상이 삭제되었다면 그 대상에 대한 이벤트가 발생해서는 안되므로 debouce를 취소시켜줌
    };
    // cleanup 함수 //9
  }, [handleRef, onMouseDown, Move]);

  //0
  return (
    <div
      className="draggable"
      ref={dragRef}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  );
};

export default Draggable;

// throttle, debounce
// 1초 간격으로 이벤트를 실행해줘, 그 사이 이벤트들은 무시해줘
// mouseup(특정 동작) 한 후 몇 초 후에 이벤트를 실행해줘

// 두 방법 모두 DOM을 기반으로 실행하는 자바스크립트를 성능상의 이유에서 js의 양적인 측면, 즉 이벤트를 제어(제한)하는 방법
// 과도한 횟수의 이벤트 실행으로 이벤트 핸들러가 무거운 계산 및 기타 DOM 조작과 같은 작업을 수없이 많이 수행하게 되면 성능 문제가 발생하고 이는 사용자 경험까지 떨어뜨리게 됨
// 이러한 문제는 2011년 웹 사이트 '트위터'에서 스크롤 시 속도가 느려지고 응답이 없는 현상으로 나타났음
// 당시 jQuery의 창시자인 존 레식이 제안한 해결책은 이벤트가 일정 시간마다, 250ms 씩 실행되는 루프였고, 이로 인해 과도한 이벤트 처리를 막을 수 있었음
// 요즘에는 그 당시보다 이벤트를 처리하는 정교한 방법으로 사용되는 것이 Throttle, Debounce 임
// Throttle 과 Debounce 는 이벤트 핸들러가 많은 연산을 수행하는 경우에 대해 제약을 걸어 제어할 수 있는 수준으로 이벤트를 발생시키는 것을 목표로 하는 기술
// Throttle 과 Debounce 는 시간이 지남에 따라 함수를 몇 번이나 실행할 지를 제어하는 유사한 기술이지만 서로 다른 점이 있음

// Debounce
// Debounce 는 이벤트를 그룹화하여 특정 시간이 지난 후 하나의 이벤트만 발생하도록 하는 기술로, 순차적 호출을 하나의 그룹으로 '그룹화' 할 수 있음
// 연이어 호출되는 함수들 중 마지막 함수(또는 첫번째 함수)만 호출하도록 하는 방법
// 연속적으로 빠르게 일어나는 이벤트가 아니라 이벤트 사이에 큰 간격이 있다면 debouncing은 발생하지 않음

// Throttle
// Throttle 은 이벤트를 일정한 주기마다 발생하도록 하는 기술
// 예를 들어 Throttle의 설정시간으로 1ms를 주게 되면 해당 이벤트는 1ms 동안 최대 한번만 발생하게 됨
// 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 방법
// 특성 자체가 실행 횟수에 제한을 거는 것이기 때문에 일반적으로 성능 문제에 많이 사용함

// 예시
// 무한 스크롤링 페이지
// 사용자가 footer에서 얼마나 떨어져 있는지 확인하고 사용자가 맨 아래로 스크롤 했다면 더 많은 콘텐츠를 요청하여 페이지에 추가해야 함
// Debounce를 사용하면 사용자가 스크롤을 멈출 때에만 이벤트를 발생시키므로 사용자가 footer에 도달하기 전에 콘텐츠를 가져오기 위해서는 Throttle이 적합함

// 차이점
// Debounce와 Throttle의 가장 큰 차이점은 Throttle은 적어도 x 밀리초 마다 정기적인 실행을 보장한다는 것임
// Debounce는 아무리 많은 이벤트가 발생해도 모두 무시하고 특정 시간 사이에 어떠한 이벤트도 발생하지 않았을 때 딱 한번만 마지막(또는 첫번째) 이벤트를 발생시킴

// 로우대시, 언더스코어

// useMemo
// 성능 최적화를 위하여 연산된 값을 재사용 할 수 있게 하는 hook
// "memoized"하는 것으로, 이전에 계산한 값을 재사용한다는 의미
// useMemo의 첫번째 파라미터에는 어떻게 연산할 지 정의하는 함수를
// 두번째 파라미터에는 deps 배열을 넣어주면 됨
// 이 deps 배열 안에 넣은 내용이 바뀌면, 등록한 함수를 호출해서 값을 연산해주고 만약 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됨
