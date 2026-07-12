import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center py-10 sm:py-12 lg:py-16 transition-colors duration-300">
      <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <span className="mx-auto px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-[#F83002] font-medium text-sm sm:text-base">
          Connecting Talent with Opportunity
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-2">
          Find thousands of internships and full-time opportunities from top
          companies. Build your career with confidence.
        </p>

        {/* Search Box */}
        <div className="flex w-full sm:w-[90%] md:w-[75%] lg:w-[55%] xl:w-[50%] mx-auto items-center rounded-full border border-gray-300 bg-white shadow-lg overflow-hidden">
          <input
            type="text"
            placeholder="Find your dream jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 sm:px-5 py-3 bg-transparent text-black placeholder:text-gray-500 outline-none text-sm sm:text-base"
          />

          <button
            onClick={searchJobHandler}
            className="bg-[#6A38C2] hover:bg-[#5B21B6] h-12 sm:h-14 w-16 sm:w-20 rounded-r-full flex items-center justify-center transition duration-300"
          >
            <Search size={22} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;