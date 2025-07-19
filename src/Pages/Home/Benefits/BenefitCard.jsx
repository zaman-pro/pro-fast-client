import React from "react";

const BenefitCard = ({ benefit }) => {
  const { title, description, image } = benefit;
  return (
    <div className="flex items-center gap-12 bg-[#EAECED] p-8 rounded-3xl">
      <img
        src={image}
        alt={title}
        className="w-[200px] h-[200px] object-contain"
      />

      {/* Vertical dashed line */}
      <div className="h-[150px] border-l border-dashed border-[#03464D]" />

      {/* Content */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <h3 className="text-2xl font-extrabold text-[#03373D]">{title}</h3>
        <p className="text-[#606060] font-medium">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
