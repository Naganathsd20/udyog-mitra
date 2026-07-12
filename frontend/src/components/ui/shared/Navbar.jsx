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
import { LogOut, User2, Bookmark, Menu, X } from "lucide-react";
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
    setOpen(false);
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
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Desktop + Mobile Header */}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Udyog<span className="text-[#F83002]">Mitra</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 font-medium text-slate-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#6A38C2]">
                    Companies
                  </Link>
                </li>

                <li>
                  <Link to="/admin/jobs" className="hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2]">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                </li>

                <li>
                  <Link to="/browse" className="hover:text-[#6A38C2]">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
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
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>

                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>

                    <div className="mt-4 flex flex-col gap-3">
                      {user?.role === "student" && (
                        <>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 hover:text-violet-600"
                          >
                            <User2 size={18} />
                            Profile
                          </Link>

                          <Link
                            to="/saved-jobs"
                            className="flex items-center gap-2 hover:text-violet-600"
                          >
                            <Bookmark size={18} />
                            Saved Jobs
                          </Link>
                        </>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-100 hover:text-violet-700 transition"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="flex flex-col gap-4 px-6 py-5">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">Companies</Link>
                <Link to="/admin/jobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
              </>
            )}

            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#5b38a6]">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {user.role === "student" && (
                  <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/saved-jobs">Saved Jobs</Link>
                  </>
                )}

                <button
                  onClick={logoutHandler}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-100 hover:text-violet-700 transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
