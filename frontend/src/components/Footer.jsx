import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <Link to="/">
              <h2 className="text-2xl font-bold text-black hover:text-[#6A38C2] transition">
                Udyog<span className="text-[#F83002]">Mitra</span>
              </h2>
            </Link>

            <p className="mt-2 text-sm text-gray-600">
              Connecting Talent with Opportunity.
            </p>

            <p className="text-sm text-gray-500 mt-1">
              © {new Date().getFullYear()} UdyogMitra. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              LinkedIn
            </a>

            <a
              href="mailto:support@jobportal.com"
              className="text-gray-600 hover:text-[#6A38C2] transition"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;