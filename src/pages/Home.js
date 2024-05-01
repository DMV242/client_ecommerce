import { Box } from "@mui/material";
import React from "react";
import NavBar from "../components/Navigation/NavBar";
import Slide from "../components/slider/Slide";

const Home = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F5F5F5",
          width: "100%",
          height: "54px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Home
      </Box>
      <Slide />
    </>
  );
};

export default Home;
