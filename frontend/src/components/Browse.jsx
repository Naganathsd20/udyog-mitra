import React, { useEffect } from "react";
import Navbar from "./ui/shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Search Results
          </h1>

          <p className="text-slate-500 mt-2">
            {allJobs.length} jobs found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length <= 0 ? (
            <div className="col-span-full text-center py-20">
              <h2 className="text-2xl font-semibold text-slate-700">
                No Jobs Found
              </h2>
              <p className="text-slate-500 mt-2">
                Try searching with different keywords.
              </p>
            </div>
          ) : (
            allJobs.map((job) => <Job key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;