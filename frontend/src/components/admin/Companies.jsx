import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Plus, Search, Building2 } from "lucide-react";

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <Building2 className="text-violet-600" size={34} />
              Companies
            </h1>

            <p className="text-slate-500 mt-2">
              Manage all your registered companies.
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-violet-600 hover:bg-violet-700 rounded-xl px-6 h-11 flex items-center gap-2"
          >
            <Plus size={18} />
            New Company
          </Button>
        </div>

        {/* Search & Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

          <div className="relative w-full md:w-80 mb-6">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <Input
              className="pl-10 rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
              placeholder="Search companies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;