import React from "react";
import { Box, Button } from "@mui/material";
import video from "../assets/video.mp4";
import "./Hero.css";
import { Link } from "react-scroll";

function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "700px", objectFit: "cover" }}
      >
        <source src={video} type="video/mp4" />
      </video>
      <Box
        sx={{
          display: "inline-block",
          textAlign: "left",
          zIndex: "1",
          color: "white",
          width: "70%",
          padding: "20px", // Ajout de padding pour améliorer la lisibilité
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Fond semi-transparent
          borderRadius: "10px", // Coins arrondis
          position: "absolute", // Retiré pour permettre l'adaptation à l'écran
          top: "50%", // Centrage vertical
          left: "50%", // Centrage horizontal
          transform: "translate(-50%, -50%)", // Centrage exact
        }}
      >
        <div className="hero-container">
          <h1 className="Olosa">
            OLLOSA
          </h1>
          <h2 className="title">
            Votre joueur préféré, votre histoire à raconter
          </h2>
          <h3 className="slogan">
            Découvrez notre catalogue des plus grandes personnalités du football et faites-les dire ce que vous voulez !!!
          </h3>

          <Link to="catalogue" smooth={true}>
            <button class="btn" > Voir le catalogue </button>
          </Link>

        </div>
      </Box>
    </Box>
  );
}

export default Hero;
