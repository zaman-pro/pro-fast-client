import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import Benefits from "../Benefits/Benefits";
import BeMerchant from "../BeMerchant/BeMerchant";

const Home = () => {
  return (
    <div className="space-y-24">
      <Banner />
      <Services />
      <ClientLogosMarquee />
      <Benefits />
      <BeMerchant />
    </div>
  );
};

export default Home;
