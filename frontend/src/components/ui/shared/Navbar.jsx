import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LogOut,
  User2,
  Bookmark,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Udyog<span className="text-[#F83002]">Mitra</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 font-medium text-slate-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="transition-all duration-200 hover:text-[#6A38C2] hover:scale-105"
                  >
                    Companies
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/jobs"
                    className="transition-all duration-200 hover:text-[#6A38C2] hover:scale-105"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2] transition">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2] transition">
                    Jobs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#6A38C2] transition"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b38a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />
                  <AvatarFallback>
                    {user?.fullname?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded-xl border border-slate-200 shadow-xl">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="profile"
                    />
                    <AvatarFallback>
                      {user?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">
                      {user?.fullname}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>

                    <div className="mt-4 flex flex-col gap-3">
                      {user?.role === "student" && (
                        <>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 hover:text-[#6A38C2] transition"
                          >
                            <User2 size={18} />
                            <span>View Profile</span>
                          </Link>

                          <Link
                            to="/saved-jobs"
                            className="flex items-center gap-2 hover:text-[#6A38C2] transition"
                          >
                            <Bookmark size={18} />
                            <span>Saved Jobs</span>
                          </Link>
                        </>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="flex items-center gap-2 hover:text-red-600 transition"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
