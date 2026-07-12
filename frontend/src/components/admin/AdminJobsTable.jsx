import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableCaption className="py-5 text-slate-500">
            A list of your posted jobs
          </TableCaption>

          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="whitespace-nowrap">
                Company
              </TableHead>

              <TableHead className="whitespace-nowrap">
                Job Role
              </TableHead>

              <TableHead className="whitespace-nowrap">
                Posted On
              </TableHead>

              <TableHead className="text-right whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-slate-500"
                >
                  No jobs found.
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job) => (
                <TableRow
                  key={job._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {job.company?.name}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {job.title}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {job.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-violet-100 transition"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        side="bottom"
                        align="end"
                        sideOffset={8}
                        className="z-[99999] w-40 rounded-lg border bg-white p-2 shadow-2xl"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/companies/${job.company?._id}`
                            )
                          }
                          className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-slate-100"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/jobs/${job._id}/applicants`
                            )
                          }
                          className="mt-1 flex w-full items-center gap-2 rounded-md p-2 hover:bg-slate-100"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Applicants</span>
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;