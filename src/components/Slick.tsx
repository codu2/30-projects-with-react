import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Slick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <h3 style={{ height: 300, background: "red" }}>1</h3>
      </div>
      <div>
        <h3 style={{ height: 300, background: "orange" }}>2</h3>
      </div>
      <div>
        <h3 style={{ height: 300, background: "yellow" }}>3</h3>
      </div>
      <div>
        <h3 style={{ height: 300, background: "green" }}>4</h3>
      </div>
      <div>
        <h3 style={{ height: 300, background: "blue" }}>5</h3>
      </div>
      <div>
        <h3 style={{ height: 300, background: "purple" }}>6</h3>
      </div>
    </Slider>
  );
};

export default Slick;
