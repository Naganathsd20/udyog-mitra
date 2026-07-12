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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const navigate = useNavigate();

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;

      return company.name
        .toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200">
      <Table>
        <TableCaption className="py-5 text-slate-500">
          A list of your registered companies
        </TableCaption>

        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="min-w-[90px] font-semibold">
              Logo
            </TableHead>

            <TableHead className="min-w-[220px] font-semibold">
              Company Name
            </TableHead>

            <TableHead className="min-w-[140px] font-semibold">
              Created On
            </TableHead>

            <TableHead className="min-w-[100px] text-right font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-slate-500"
              >
                No companies registered yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <Avatar className="h-12 w-12 border border-slate-200 rounded-xl">
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium text-slate-800">
                  {company.name}
                </TableCell>

                <TableCell className="text-slate-500 whitespace-nowrap">
                  {company.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-violet-100 hover:text-violet-700"
                    onClick={() =>
                      navigate(`/admin/companies/${company._id}`)
                    }
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;