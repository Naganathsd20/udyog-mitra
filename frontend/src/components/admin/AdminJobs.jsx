import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import {
  Plus,
  Search,
  BriefcaseBusiness,
  Building2,
  Users,
} from "lucide-react";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  useGetAllCompanies();

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allAdminJobs } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);

  const totalApplicants = allAdminJobs.reduce(
    (total, job) => total + (job.applications?.length || 0),
    0
  );

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <BriefcaseBusiness
                className="text-violet-600"
                size={34}
              />
              Jobs
            </h1>

            <p className="text-slate-500 mt-2">
              Manage all your posted jobs from one place.
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-violet-600 hover:bg-violet-700 rounded-xl px-6 h-11 flex items-center gap-2"
          >
            <Plus size={18} />
            New Job
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Companies</p>
                <h2 className="text-4xl font-bold mt-2">
                  {companies.length}
                </h2>
              </div>

              <div className="bg-violet-100 p-3 rounded-xl">
                <Building2 className="text-violet-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Jobs</p>
                <h2 className="text-4xl font-bold mt-2">
                  {allAdminJobs.length}
                </h2>
              </div>

              <div className="bg-blue-100 p-3 rounded-xl">
                <BriefcaseBusiness
                  className="text-blue-600"
                  size={28}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  Total Applicants
                </p>
                <h2 className="text-4xl font-bold mt-2">
                  {totalApplicants}
                </h2>
              </div>

              <div className="bg-green-100 p-3 rounded-xl">
                <Users className="text-green-600" size={28} />
              </div>
            </div>
          </div>

        </div>

        {/* Search & Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="relative w-full md:w-80 mb-6">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <Input
              className="pl-10 rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
              placeholder="Search jobs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;