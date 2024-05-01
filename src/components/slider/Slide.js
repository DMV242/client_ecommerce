import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import images from "../../data/Images";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function Slide() {
  function MySwiperComponent({ images }) {
    return (
      <div>
        {[...Array(3)].map((_, index) => (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            key={index}
            spaceBetween={15}
            slidesPerView={4}
            navigation
            pagination
            onSwiper={(swiper) => swiper}
            effect="fade"
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <Link to={`/player/${idx}`}>
                  <img
                    src={image}
                    alt={`Slide ${idx}`}
                    style={{
                      height: "500px",
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: "24px",
                      padding: "16px",
                      margin: "10px"
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>
    );
  }

  return <MySwiperComponent images={images} />;
}

export default Slide;
