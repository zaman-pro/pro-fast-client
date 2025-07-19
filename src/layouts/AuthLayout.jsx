import React from "react";
import { Outlet } from "react-router";
import image from "../assets/authImage.png";
import ProFastLogo from "../Pages/shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="mt-12 ml-14">
        <ProFastLogo />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
        <Outlet />
      </div>

      {/* Image Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#FAFDF0]">
        <div>
          <img
            src={image}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
