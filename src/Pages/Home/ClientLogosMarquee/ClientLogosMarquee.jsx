// src/components/ClientLogos.jsx
import React from "react";
import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startPeople from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";

const logos = [
  { src: amazon, alt: "Amazon" },
  { src: amazonVector, alt: "Amazon Vector" },
  { src: casio, alt: "Casio" },
  { src: moonstar, alt: "Moonstar" },
  { src: randstad, alt: "Randstad" },
  { src: startPeople, alt: "Start People" },
  { src: start, alt: "Start" },
];

const ClientLogosMarquee = () => {
  return (
    <section className="py-10 px-[110px] bg-[#EAECED]">
      <h2 className="text-3xl font-extrabold  text-center text-[#03373D] mb-10">
        We've helped thousands of sales teams
      </h2>

      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="flex gap-10"
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className="mx-16 flex items-center justify-center min-w-[150px]"
          >
            <img src={logo.src} alt={logo.alt} className="h-6 object-contain" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogosMarquee;
