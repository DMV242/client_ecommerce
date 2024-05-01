import { Box, Typography } from "@mui/material";
import React from "react";

const PlanelShowUser = () => {
  return (
    <Box>
      {" "}
      <Typography
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          color: "#000000",
          lineHeight: "32px",
          textTransform: "none",
          letterSpacing: "normal",
        }}
      >
        Voir les Utilisateurs
      </Typography>
    </Box>
  );
};

export default PlanelShowUser;
