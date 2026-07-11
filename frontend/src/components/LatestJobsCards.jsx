import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Company */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-black dark:text-white">
            {job?.company?.name}
          </h1>

          <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-sm">
            <MapPin size={14} />
            <span>India</span>
          </div>
        </div>
      </div>

      {/* Job Title */}
      <div className="mt-5">
        <h2 className="text-xl font-bold text-black dark:text-white">
          {job?.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-6">
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        >
          <Briefcase className="w-3 h-3 mr-1" />
          {job?.position} Positions
        </Badge>

        <Badge
          variant="secondary"
          className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
        >
          {job?.jobType}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
        >
          <IndianRupee className="w-3 h-3 mr-1" />
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;