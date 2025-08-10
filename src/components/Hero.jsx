import React from "react";
import heroImg from "../assets/images/hero_img.jpg"; // adjust path

const Hero = () => {
  return (
    <section
      className="py-10 mb-4 bg-center bg-cover relative"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white sm:text-5xl md:text-4xl">
            Furniture Search Agent
          </h1>
          <p className="my-4 text-xl text-white">Built by Andrei Daskalov</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
