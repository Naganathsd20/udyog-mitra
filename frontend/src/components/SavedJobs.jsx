import React, { useEffect, useState } from "react";
import Navbar from "./ui/shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { Button } from "./ui/button";
import { BookmarkCheck, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/saved`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setSavedJobs(res.data.savedJobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeSavedJob = async (id) => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/unsave/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchSavedJobs();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto my-8 sm:my-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center sm:text-left">
            Saved Jobs
          </h1>

          <p className="text-slate-500 mt-2 text-center sm:text-left">
            Manage all your bookmarked opportunities.
          </p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 text-center py-12 sm:py-20 shadow-sm">
            <BookmarkCheck className="mx-auto h-14 w-14 sm:h-16 sm:w-16 text-gray-400" />

            <h2 className="text-xl sm:text-2xl font-semibold mt-4">
              No Saved Jobs
            </h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Save jobs to view them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
              >
                <img
                  src={job.company?.logo}
                  alt={job.company?.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 p-2 mb-4"
                />

                <h2 className="font-bold text-lg sm:text-xl">
                  {job.title}
                </h2>

                <p className="text-slate-500">
                  {job.company?.name}
                </p>

                <div className="flex items-center gap-2 mt-3 text-sm sm:text-base">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm sm:text-base">
                  <Briefcase size={16} />
                  <span>{job.jobType}</span>
                </div>

                <p className="font-bold text-violet-600 mt-3">
                  ₹ {job.salary} LPA
                </p>

                <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/description/${job._id}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-violet-600 hover:bg-violet-700">
                      View
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={() => removeSavedJob(job._id)}
                    className="w-full sm:w-auto"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;