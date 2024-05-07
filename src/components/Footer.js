import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "rgb(104,104,108)",
        background: "linear-gradient(90deg, rgba(104,104,108,1) 0%, rgba(99,99,103,1) 5%, rgba(90,90,94,1) 13%, rgba(83,83,87,1) 20%, rgba(76,76,80,1) 27%, rgba(66,66,70,1) 36%, rgba(57,57,61,1) 44%, rgba(51,51,55,1) 50%, rgba(42,42,46,1) 58%, rgba(35,35,38,1) 65%, rgba(28,28,30,1) 72%, rgba(22,22,24,1) 78%, rgba(15,15,16,1) 85%, rgba(9,9,9,1) 91%, rgba(5,5,5,1) 95%, rgba(0,0,0,1) 100%)",
        color: "#fff", // Couleur du texte
        textAlign: "center",
        padding: "20px 0", // Espacement intérieur du footer
        marginTop: "100px", // Marge en haut du footer
        width: "100%",
        height: "30vh"
      }}
    >
      <Typography variant="body1">
        © 2024 ARROUCHE Melchior, BROURI Oussama, MVOULA MOUKOUYOU David Valle, DE ALMEIDA Raphaël / Ollosa / School Project. Tous droits réservés.
      </Typography>
    </Box>
  );
};

export default Footer;
