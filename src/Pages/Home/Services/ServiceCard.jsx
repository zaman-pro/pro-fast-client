import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;

  return (
    <div className="bg-white rounded-2xl p-8 text-center flex flex-col items-center justify-start gap-4 h-full hover:bg-[#CAEB66] hover:cursor-pointer transition duration-300">
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(180deg, #EEEDFC 0%, rgba(238, 237, 252, 0.00) 100%)",
        }}
      >
        <Icon className="text-[#33929D] text-3xl" />
      </div>
      <h3 className="text-2xl font-bold text-[#03373D]">{title}</h3>
      <p className="font-medium text-[#606060]">{description}</p>
    </div>
  );
};

export default ServiceCard;
