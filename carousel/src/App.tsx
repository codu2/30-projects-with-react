//import Antd from "./components/Antd";
//import Responsive from "./components/Responsive";
//import Slick from "./components/Slick";
import Carousel from "./components/Carousel";

function App() {
  return (
    <div>
      <Carousel
        loop
        autoLoop
        autoTime={2000}
        transitionTime={1000}
        direction="column"
      >
        <h1>hello</h1>
        <h1>react</h1>
        <h1>carousel</h1>
      </Carousel>
      {/*
        <div>Antd</div>
        <Antd />
        <div>Responsive</div>
        <Responsive />
        <div>Slick</div>
        <Slick />
      */}
    </div>
  );
}

export default App;

//{[<>hello</>, <>world</>]}
