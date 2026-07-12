import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(user?.savedJobs?.includes(job?._id));
  }, [user, job]);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const saveJobHandler = async () => {
    try {
      const endpoint = isSaved
        ? `${USER_API_END_POINT}/unsave/${job._id}`
        : `${USER_API_END_POINT}/save/${job._id}`;

      const res = await axios.post(
        endpoint,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedUser = {
          ...user,
          savedJobs: isSaved
            ? user.savedJobs.filter((id) => id !== job._id)
            : [...(user.savedJobs || []), job._id],
        };

        dispatch(setUser(updatedUser));
        setIsSaved(!isSaved);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        <Button
          variant="outline"
          className="rounded-full hover:bg-slate-100 transition"
          size="icon"
          onClick={saveJobHandler}
        >
          <Bookmark
            className={`transition ${
              isSaved
                ? "fill-[#6A38C2] text-[#6A38C2]"
                : "text-slate-600"
            }`}
          />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <Button
          className="p-6 sm:p-7 rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100"
          variant="outline"
          size="icon"
        >
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
            <div className="flex h-full w-full items-center justify-center font-bold text-lg">
              {job?.company?.name?.charAt(0)}
            </div>
          </Avatar>
        </Button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
            {job?.company?.name}
          </h1>

          <p className="text-sm text-slate-500 truncate">
            {job?.location}
          </p>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex-1">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 line-clamp-2">
          {job?.title}
        </h1>

        <p className="text-sm text-slate-600 leading-6 mt-2 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-5">
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs sm:text-sm">
          {job?.jobType}
        </Badge>

        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs sm:text-sm">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="mt-5">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
          className="w-full sm:w-auto rounded-lg border-slate-300 hover:bg-slate-100 transition"
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;