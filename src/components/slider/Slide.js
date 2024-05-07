import { Navigation, Scrollbar, A11y } from "swiper/modules";
import { Swiper as swip } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { imagesCatalogue, imageTrainer, DATAS } from "../../data/Images";

import "./Swipper.css";
import { selectPlayers, getPlayers, selectPlayerStatus } from "../../redux/slice/Player";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


swip.use([Scrollbar, A11y, Navigation]);


function Slide() {

  const players = useSelector(selectPlayers);
  const status = useSelector(selectPlayerStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlayers());

  }, [dispatch])

  const swiperControl = useSwiper();


  function MySwiperComponent({ }) {
    return (
      <div className="swipecomponent">
        <h2 className="title2"> Nos joueurs vedettes </h2>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          onSlideChange={() => console.log("slide change")}
          effect="fade"
        >
          {players.map((data, index) => (
            <SwiperSlide key={data._id}>
              <Link to={`/player/${data._id}`}>

                <div style={{ maxWidth: '350px', maxHeight: '600px' }}>
                  <img src={data.image} alt={`Slide ${index}`} className="images" />
                </div>

              </Link>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    );
  }

  function MyFavComponent({ }) {
    return (

      <div id="catalogue">



        <h2 className="title2">Notre catalogue de joueurs</h2>

        <div className="gallery-container">
          <div className="gallery">

            {players.filter((data) => data.type !== "trainer").map((data, index) => (



              <div style={{ width: '250px', height: 'auto' }} key={data._id}  >
                <Link to={`/player/${data._id}`}>
                  <img src={data.image} alt={`Slide ${index}`} className="images-gallery" />
                </Link>
              </div>


            ))}
          </div>
        </div>
      </div>

    );
  }
  function MyTrainerComponent({ }) {
    return (
      <div className="trainercomponent">
        <h2 className="title2">Notre catalogue d'entraineurs</h2>
        <Swiper
          modules={[Scrollbar, A11y, Navigation]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          onSlideChange={() => console.log("slide change")}
          effect="fade"
        >
          {players.filter((data) => data.type === "trainer").map((data, index) => (
            <SwiperSlide key={data._id}>
              <Link to={`/player/${data._id}`}>

                <div style={{ maxWidth: '350px', maxHeight: '600px' }}>
                  <img src={data.image} alt={`Slide ${index}`} className="images" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }


  return (
    <>
      {status === "succeeded" && <>
        <MySwiperComponent images={imagesCatalogue} />
        <MyTrainerComponent images={imageTrainer} />
        <MyFavComponent name="catalogue" />
      </>

      }



    </>
  );
}

export default Slide;



