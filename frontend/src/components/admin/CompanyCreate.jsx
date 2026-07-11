import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { ArrowLeft, Building2 } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");

  const registerCompany = async () => {
    if (!companyName) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">

        <Button
          variant="outline"
          onClick={() => navigate("/admin/companies")}
          className="mb-6 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-10">

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-violet-100 p-3 rounded-xl">
              <Building2 className="text-violet-600" size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Create Company
              </h1>

              <p className="text-slate-500 mt-1">
                Start by entering your company name. You can update the remaining
                details later.
              </p>
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <Label className="text-slate-700">
              Company Name
            </Label>

            <Input
              type="text"
              placeholder="Google, Microsoft, Amazon..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-11 rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="rounded-xl"
            >
              Cancel
            </Button>

            <Button
              onClick={registerCompany}
              className="bg-violet-600 hover:bg-violet-700 rounded-xl px-8"
            >
              Continue
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;