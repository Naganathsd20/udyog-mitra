import React, { useEffect, useState } from "react";
import Navbar from "./ui/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filter Section */}
          <div className="w-full lg:w-[25%]">
            <div className="lg:sticky lg:top-24">
              <FilterCard />
            </div>
          </div>

          {/* Jobs Section */}
          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <div className="flex items-center justify-center h-[50vh] sm:h-[60vh]">
                <div className="text-center px-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
                    No Jobs Found
                  </h2>

                  <p className="text-slate-500 mt-2 text-sm sm:text-base">
                    Try changing your search or filter.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;