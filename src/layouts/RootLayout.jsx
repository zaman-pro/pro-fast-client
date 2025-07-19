import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar/Navbar";
import Footer from "../Pages/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="space-y-24 max-w-7xl mx-auto">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default RootLayout;
