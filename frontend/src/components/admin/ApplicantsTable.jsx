import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { MoreHorizontal, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden">
      <Table>
        <TableCaption className="py-4 text-slate-500">
          List of applicants for this job
        </TableCaption>

        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-medium">
                  {item?.applicant?.fullname}
                </TableCell>

                <TableCell>{item?.applicant?.email}</TableCell>

                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-violet-600 hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-slate-400">NA</span>
                  )}
                </TableCell>

                <TableCell>
                  {item?.applicant?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-lg hover:bg-slate-100">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </PopoverTrigger>

                   <PopoverContent
  side="bottom"
  align="end"
  className="z-[9999] w-40 bg-white border shadow-xl p-2"
>
                      {shortlistingStatus.map((status) => (
                        <button
                          key={status}
                          onClick={() =>
                            statusHandler(status, item._id)
                          }
                          className={`w-full text-left px-3 py-2 rounded-md transition ${
                            status === "Accepted"
                              ? "hover:bg-green-100 hover:text-green-700"
                              : "hover:bg-red-100 hover:text-red-700"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-slate-500"
              >
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;