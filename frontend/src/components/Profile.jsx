import React, { useState } from "react";
import Navbar from "./ui/shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/ueGetAppliedJob"

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);


  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />

     <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 my-8 p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-28 w-28 border-4 border-violet-100 shadow-md">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>

            <div>
           <h1 className="text-3xl font-bold text-slate-900">{user?.fullname}</h1>
              <p className="text-slate-600 mt-2">
  {user?.profile?.bio || "No bio added"}
</p>
            </div>
          </div>

         <Button
  onClick={() => setOpen(true)}
  variant="outline"
  className="rounded-xl hover:bg-slate-100"
           // variant="outline"
            size="icon"
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Details */}
        <div className="my-8 space-y-5">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-600" />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Contact className="text-gray-600" />
            <span>{user?.phoneNumber}</span>
          </div>

          {/* Skills */}
          <div>
            <h1 className="font-bold mb-2">Skills</h1>

            <div className="flex items-center gap-2 flex-wrap">
              {user?.profile?.skills?.length !== 0 ? (
                user?.profile?.skills?.map((item, index) => (
                  <Badge
                    key={index}
                    className="rounded-full bg-violet-100 text-violet-700 hover:bg-violet-100 px-3 py-1"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>

            {user?.profile?.resume ? (
              <a
                href={`${user.profile.resume}?fl_attachment=${encodeURIComponent(
                  user.profile.resumeOriginalName
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 font-medium hover:underline"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-10">
        <h1 className="font-bold text-lg my-5">Applied Job</h1>

        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;