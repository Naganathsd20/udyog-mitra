import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <SearchX className="mx-auto h-20 w-20 text-[#6A38C2]" />

        <h1 className="mt-6 text-6xl font-extrabold text-slate-900">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-slate-700">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <Button className="mt-8 bg-[#6A38C2] hover:bg-[#5b30b5]">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;