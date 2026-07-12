import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col"
    >
      {/* Company */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-black dark:text-white truncate">
            {job?.company?.name}
          </h1>

          <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-sm">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="truncate">India</span>
          </div>
        </div>
      </div>

      {/* Job Title */}
      <div className="mt-5 flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white line-clamp-2">
          {job?.title}
        </h2>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-6">
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs sm:text-sm"
        >
          <Briefcase className="w-3 h-3 mr-1" />
          {job?.position} Positions
        </Badge>

        <Badge
          variant="secondary"
          className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 text-xs sm:text-sm"
        >
          {job?.jobType}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs sm:text-sm"
        >
          <IndianRupee className="w-3 h-3 mr-1" />
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;