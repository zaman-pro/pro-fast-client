import React from "react";
import { NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { FiArrowUpRight } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const navItems = (
    <>
      <li>
        <NavLink to="/">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/add-parcel">Add Parcel</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/be-a-rider">Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 px-8 py-5 border rounded-2xl border-[#DADADA] mt-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <ProFastLogo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-outline mr-4 rounded-xl px-8 py-6 font-bold text-xl text-[#606060] border-[#DADADA]">
          Sign In
        </a>
        <a className="btn bg-[#CAEB66] rounded-xl px-8 py-6 font-bold text-xl text-[#1F1F1F]">
          Be a rider
        </a>
        <a className="bg-[#1F1F1F] rounded-full text-[#CAEB66] p-3">
          <FiArrowUpRight size={32} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
