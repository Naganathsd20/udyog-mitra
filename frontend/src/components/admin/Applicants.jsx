import React, { useEffect } from "react";
import Navbar from "../ui/shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Applicants
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Review and manage candidates who applied for this job.
          </p>
        </div>

        {/* Applicants Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Total Applicants
              </h2>

              <p className="text-slate-500 text-sm">
                {applicants?.applications?.length || 0} candidate(s) applied
              </p>
            </div>
          </div>

          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;