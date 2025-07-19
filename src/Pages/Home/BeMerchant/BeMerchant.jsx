import React from "react";
import location from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div
      data-aos="flip-left"
      className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat p-20 rounded-4xl bg-[#03373D]"
    >
      <div className="hero-content flex-col lg:flex-row-reverse text-white">
        <img src={location} className="max-w-sm rounded-lg" />
        <div>
          <h1 className="text-[40px] font-extrabold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="mt-4 mb-8">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary text-black rounded-full">
            Become a Merchant
          </button>
          <button className="btn btn-outline text-primary rounded-full ms-4">
            Earn with Profast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
