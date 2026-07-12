import React from "react";
import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-12 sm:my-16 lg:my-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white text-center sm:text-left">
        <span className="text-[#6A38C2]">Latest & Top </span>
        Job Openings
      </h1>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {!allJobs || allJobs.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              No Jobs Available
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Please check back later for new opportunities.
            </p>
          </div>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobsCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;