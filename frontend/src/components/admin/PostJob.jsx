import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2, BriefcaseBusiness } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { JOB_API_END_POINT } from "@/utils/constant";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const PostJob = () => {
  useGetAllCompanies();

  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    setInput((prev) => ({
      ...prev,
      companyId: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-8">
          {/* Heading */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-violet-100 p-3 rounded-xl flex-shrink-0">
              <BriefcaseBusiness className="text-violet-600" size={30} />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Post New Job
              </h1>

              <p className="text-slate-500 mt-1 text-sm sm:text-base">
                Fill in the details below to publish a new job opening.
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Title</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Requirements</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Salary (LPA)</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="number"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Job Type</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Experience Level</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="number"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>No. of Positions</Label>
                <Input
                  className="mt-2 rounded-xl"
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                />
              </div>

              {companies.length > 0 && (
                <div className="md:col-span-2">
                  <Label>Select Company</Label>

                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full mt-2 rounded-xl">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company._id}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {loading ? (
              <Button
                disabled
                className="w-full mt-8 rounded-xl bg-violet-600 hover:bg-violet-700"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-8 rounded-xl bg-violet-600 hover:bg-violet-700"
              >
                Post New Job
              </Button>
            )}

            {companies.length === 0 && (
              <p className="text-center text-red-600 font-semibold mt-5">
                *Please register a company first before posting a job.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;