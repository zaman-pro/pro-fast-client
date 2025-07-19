import React from "react";
import { Link } from "react-router";
import errorImg from "../../assets/error-404.png";

const Error = () => {
  return (
    <div className="flex justify-center items-center min-h-scree">
      <div className="flex flex-col justify-center items-center gap-8 min-h-screen">
        <img src={errorImg} alt="" />
        <Link
          to="/"
          className="px-8 py-4 bg-[#CAEB66] text-[#1F1F1F] rounded-xl font-bold text-xl hover:bg-lime-500 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
