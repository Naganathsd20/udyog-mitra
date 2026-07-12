import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
    ],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "40k-1 Lakh", "1 Lakh - 5 Lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 w-full">
      <h1 className="text-lg sm:text-xl font-bold text-slate-800">
        Filter Jobs
      </h1>

      <p className="text-sm text-slate-500 mt-1">
        Find jobs that match your preferences.
      </p>

      <hr className="my-4 sm:my-5" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div key={index} className="mb-5 sm:mb-6">
            <h2 className="font-semibold text-slate-800 mb-3 text-sm sm:text-base">
              {data.fitlerType}
            </h2>

            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;

              return (
                <div
                  key={itemId}
                  className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                >
                  <RadioGroupItem value={item} id={itemId} />

                  <Label
                    htmlFor={itemId}
                    className="cursor-pointer text-slate-700 text-sm sm:text-base leading-5"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;