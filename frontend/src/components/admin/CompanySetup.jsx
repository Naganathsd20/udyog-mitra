import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Building2, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">

        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/companies")}
          className="mb-6 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-8">

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-violet-100 p-3 rounded-xl">
              <Building2 className="text-violet-600" size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Company Setup
              </h1>

              <p className="text-slate-500 mt-1">
                Update your company information and branding.
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler}>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <Label>Company Name</Label>
                <Input
                  className="mt-2 rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  className="mt-2 rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Website</Label>
                <Input
                  className="mt-2 rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  className="mt-2 rounded-xl border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="md:col-span-2">
                <Label>Company Logo</Label>

                <Input
                  className="mt-2 rounded-xl border-slate-300"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </div>

            </div>

            {loading ? (
              <Button
                disabled
                className="w-full mt-8 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-8 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
              >
                Save Changes
              </Button>
            )}

          </form>

        </div>

      </div>
    </div>
  );
};

export default CompanySetup;