
import React from "react";
import NavBar from "../components/Navigation/NavBar";
import Slide from "../components/slider/Slide";
import Footer from "../components/Footer";

import Hero from "../components/Hero";
import Partner from "../components/Partnair";



const Home = () => {
  return (
    <>
      <main id="main">
        <NavBar />
        <Hero />
        <Partner />
        <Slide />
        <Footer />
      </main>
    </>
  );
};

export default Home;
