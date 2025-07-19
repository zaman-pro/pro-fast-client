import React from "react";
import ServiceCard from "./ServiceCard";
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaBoxes,
  FaMoneyBillWave,
  FaWarehouse,
  FaUndoAlt,
} from "react-icons/fa";

const services = [
  {
    icon: FaShippingFast,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
  },
  {
    icon: FaBoxes,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: FaWarehouse,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: FaUndoAlt,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const Services = () => {
  return (
    <section
      className="bg-[#03373D] text-base-content py-[100px] px-[110px] rounded-4xl"
      id="our-services"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[40px] text-center mb-4 font-extrabold text-white">
          Our Services
        </h2>
        <p className="text-center text-[#DADADA] mb-12 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <div key={index} className="h-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
