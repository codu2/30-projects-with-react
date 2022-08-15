import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Responsive = () => {
  return (
    <Carousel infiniteLoop>
      <div style={{ height: 500, background: "yellow" }}>hello</div>
      <div style={{ height: 500, background: "green" }}>react</div>
      <div style={{ height: 500, background: "purple" }}>world</div>
    </Carousel>
  );
};

export default Responsive;
