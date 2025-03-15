import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Stats from "./Stats";
import FAQ from "./FAQ";
import Features from "./Features";
import AboutUs from "./AboutUs";
import Newsletter from "./Newsletter";

function Home() {
  return (
    <div>
      <Hero />
      <div class="max-w-full mx-5 lg:max-w-[1140px] lg:mx-auto">
        <Features />
        <AboutUs />
        <Services />
        <Testimonials />
        <Stats />
        <FAQ />
        <Newsletter />
      </div>
    </div>
  );
}

export default Home;
