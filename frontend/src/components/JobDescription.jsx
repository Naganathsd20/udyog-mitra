import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
  USER_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Heart, Share2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Keep Apply & Save button in sync
  useEffect(() => {
    const applied =
      singleJob?.applications?.some(
        (application) =>
          application.applicant?._id === user?._id ||
          application.applicant === user?._id,
      ) || false;

    setIsApplied(applied);

    const saved =
      user?.savedJobs?.some((id) => id.toString() === jobId) || false;

    setIsSaved(saved);
  }, [singleJob, user, jobId]);

  const saveJobHandler = async () => {
    try {
      const endpoint = isSaved
        ? `${USER_API_END_POINT}/unsave/${jobId}`
        : `${USER_API_END_POINT}/save/${jobId}`;

      const res = await axios.post(
        endpoint,
        {},
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        const updatedUser = {
          ...user,
          savedJobs: isSaved
            ? user.savedJobs.filter((id) => id.toString() !== jobId)
            : [...(user.savedJobs || []), jobId],
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

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          const applied =
            res.data.job.applications?.some(
              (application) =>
                application.applicant?._id === user?._id ||
                application.applicant === user?._id,
            ) || false;

          setIsApplied(applied);
        }
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        setIsApplied(true);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const shareJobHandler = async () => {
    const jobUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: singleJob?.title,
          text: `Check out this job: ${singleJob?.title}`,
          url: jobUrl,
        });
      } else {
        await navigator.clipboard.writeText(jobUrl);
        toast.success("Job link copied to clipboard!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {singleJob?.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                {singleJob?.position} Position
              </Badge>

              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                {singleJob?.jobType}
              </Badge>

              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={saveJobHandler}
              variant="outline"
              className="rounded-lg border-slate-300 hover:bg-slate-100 flex items-center gap-2"
            >
              <Button
                onClick={shareJobHandler}
                variant="outline"
                className="rounded-lg border-slate-300 hover:bg-slate-100 flex items-center gap-2"
              >
                <Share2 size={18} />
                Share
              </Button>
              <Heart
                size={18}
                fill={isSaved ? "red" : "none"}
                color={isSaved ? "red" : "black"}
              />
              {isSaved ? "Saved" : "Save"}
            </Button>

            <Button
              onClick={!isApplied ? applyJobHandler : null}
              disabled={isApplied}
              className={`rounded-lg px-6 ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-12 bg-slate-50 rounded-2xl border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
            Job Description
          </h2>

          <div className="space-y-5 mt-6">
            <div className="flex border-b border-slate-100 pb-4">
              <div className="w-44 font-semibold text-slate-900">Role</div>
              <div className="text-slate-600">{singleJob?.title}</div>
            </div>

            <div className="flex border-b border-slate-100 pb-4">
              <div className="w-44 font-semibold text-slate-900">Location</div>
              <div className="text-slate-600">{singleJob?.location}</div>
            </div>

            <div className="flex border-b border-slate-100 pb-4">
              <div className="w-44 font-semibold text-slate-900">
                Description
              </div>
              <div className="text-slate-600 leading-7 flex-1">
                {singleJob?.description}
              </div>
            </div>

            <div className="flex border-b border-slate-100 pb-4">
              <div className="w-44 font-semibold text-slate-900">
                Experience
              </div>
              <div className="text-slate-600">
                {singleJob?.experienceLevel} yrs
              </div>
            </div>

            <div className="flex border-b border-slate-100 pb-4">
              <div className="w-44 font-semibold text-slate-900">Salary</div>
              <div className="text-slate-600">{singleJob?.salary} LPA</div>
            </div>

            <div className="flex border-b border-slate-100 pb-4">
              <div className="w-44 font-semibold text-slate-900">
                Total Applicants
              </div>
              <div className="text-slate-600">
                {singleJob?.applications?.length}
              </div>
            </div>

            <div className="flex">
              <div className="w-44 font-semibold text-slate-900">
                Posted Date
              </div>
              <div className="text-slate-600">
                {singleJob?.createdAt?.split("T")[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
