import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";

const Coverage = () => {
  const serviceCenters = useLoaderData(); // ✅ Load all service center data (from loader)
  const [searchInput, setSearchInput] = useState(""); // ✅ Input state for search box
  const [searchTarget, setSearchTarget] = useState(null); // ✅ Selected district object (used to focus map)

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchInput.trim()) return; // ✅ Skip empty input

    const match = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(searchInput.toLowerCase())
    ); // ✅ Match district by name (case-insensitive)

    if (match) {
      setSearchTarget(match); // ✅ If found, update focus
    } else {
      toast.error("District not found!"); // ✅ Notify if no match
    }
  };

  return (
    <div className="space-y-12">
      {/* ✅ Page Title */}
      <h1 className="text-[56px] font-extrabold text-[#03373D]">
        We are available in 64 districts
      </h1>

      {/* ✅ Search Box */}
      <form onSubmit={handleSearchSubmit} className="w-full md:max-w-sm">
        <label className="input input-sm flex items-center gap-2 w-full focus-within:outline-none rounded-full h-12">
          <FiSearch size={18} />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search here"
            className="grow focus:outline-none"
          />
          <button
            type="submit"
            title="Search"
            className="btn rounded-full bg-[#CAEB66] -mr-2"
          >
            Search
          </button>
        </label>
      </form>

      {/* ✅ Divider */}
      <div className="divider my-12"></div>

      {/* ✅ Subtitle */}
      <h2 className="text-3xl font-extrabold text-[#03373D]">
        We deliver almost all over Bangladesh
      </h2>

      {/* ✅ Bangladesh Map Component with focus data */}
      <BangladeshMap serviceCenters={serviceCenters} focus={searchTarget} />
    </div>
  );
};

export default Coverage;
