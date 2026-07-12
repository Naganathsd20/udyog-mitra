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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  console.log("loading =", loading);
console.log("user =", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

const submitHandler = async (e) => {
  e.preventDefault();

  console.log("========== LOGIN CLICKED ==========");
  console.log("Input:", input);
  console.log("API URL:", `${USER_API_END_POINT}/login`);

  try {
    dispatch(setLoading(true));

    console.log("Sending request...");

    const res = await axios.post(
      `${USER_API_END_POINT}/login`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Response received:", res);

    if (res.data.success) {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      navigate("/");
    }
  } catch (error) {
    console.log("========== LOGIN ERROR ==========");
    console.log(error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      toast.error(error.response.data.message);
    } else if (error.request) {
      console.log("No response received");
      console.log(error.request);
      toast.error("Server is not responding.");
    } else {
      console.log("Error:", error.message);
      toast.error(error.message);
    }
  } finally {
    console.log("========== FINALLY ==========");
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

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-6 sm:py-10">
       <form
  onSubmit={submitHandler}
  className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-lg p-6 sm:p-8"
>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-2">
            Welcome to UdyogMitra
          </h1>

          <p className="text-center text-slate-500 text-sm sm:text-base mb-8">
            Connecting Talent with Opportunity
          </p>
          <div className="my-3">
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

          <div className="my-3">
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

          <div className="mt-6">
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
              Login
            </Button>
          )}

          <p className="text-sm text-center mt-6 text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-violet-600 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
