import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const { loading, user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
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
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup Failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-6 sm:py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-lg p-6 sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-2">
            Create Account
          </h1>

          <p className="text-center text-slate-500 text-sm sm:text-base mb-8">
            Join UdyogMitra and start your career journey.
          </p>

          <div className="mb-4">
            <Label>Full Name</Label>
            <Input
              className="mt-2 rounded-lg border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input
              className="mt-2 rounded-lg border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <Label>Phone Number</Label>
            <Input
              className="mt-2 rounded-lg border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input
              className="mt-2 rounded-lg border-slate-300 focus-visible:ring-2 focus-visible:ring-violet-500"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>

          <div className="mt-6 space-y-5">
            <RadioGroup className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            <div>
              <Label>Profile Image</Label>
              <Input
                className="mt-2 rounded-lg border-slate-300 text-sm"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {loading ? (
            <Button
              disabled
              className="w-full mt-8 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-8 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
            >
              Signup
            </Button>
          )}

          <p className="text-sm text-center mt-6 text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
