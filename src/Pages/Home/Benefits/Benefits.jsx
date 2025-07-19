// src/components/Benefits.jsx
import React from "react";
import BenefitCard from "./BenefitCard";
import tracking from "../../../assets/benefits/tracking.png";
import call from "../../../assets/benefits/call.png";

const benefitsData = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: call,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: call,
  },
];

const Benefits = () => {
  return (
    <section className="py-[80px] border-y border-dashed border-[#03373D] bg-base-100 px-[110px]">
      <div className="flex flex-col gap-6">
        {benefitsData.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
