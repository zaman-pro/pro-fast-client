import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const [searchInput, setSearchInput] = useState("");
  const [searchTarget, setSearchTarget] = useState(null); // this will go to map

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    const match = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (match) {
      setSearchTarget(match);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="space-y-12">
      <h1 className="text-[56px] font-extrabold text-[#03373D]">
        We are available in 64 districts
      </h1>

      {/* Search Box */}
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

      <div className="divider my-12"></div>

      <h2 className="text-3xl font-extrabold text-[#03373D]">
        We deliver almost all over Bangladesh
      </h2>

      {/* Map With Focus */}
      <BangladeshMap serviceCenters={serviceCenters} focus={searchTarget} />
    </div>
  );
};

export default Coverage;
