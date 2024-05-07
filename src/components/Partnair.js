import "./partnair.css";
import ImagePartner from "../data/ImagePartner";

function Partner() {
  return (
    <div className="partner">
      <div className="partner-text">
        <h2>Nos modèles sont utilisés par de nombreuses entreprises et startups d’IA
          ainsi que par les grandes ligues</h2>
      </div>
      <div className="partner-logo">
        <div className="partner-box-img">
          <div>
            <img
              src={ImagePartner[0].img}
              className="partner-img"
              height="100px"
            />
          </div>
          <div>
            <img
              src={ImagePartner[1].img}
              className="partner-img"
              height="100px"
            />
          </div>
          <div>
            <img
              src={ImagePartner[2].img}
              className="partner-img"
              height="100px"
            />
          </div>
          <div>
            <img
              src={ImagePartner[3].img}
              className="partner-img"
              height="100px"
            />
          </div>
          <div>
            <img
              src={ImagePartner[4].img}
              className="partner-img"
              height="100px"
            />
          </div>
          <div>
            <img
              src={ImagePartner[5].img}
              className="partner-img"
              height="100px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partner;
