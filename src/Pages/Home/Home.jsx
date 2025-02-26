import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Stats from "./Stats";
import FAQ from "./FAQ";

function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Testimonials />
      <Stats />
      <FAQ />
    </div>
  );
}

export default Home;
