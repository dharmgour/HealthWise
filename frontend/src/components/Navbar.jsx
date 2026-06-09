import React, { useState, useEffect, useRef } from "react";
import { Menu, X, LogOut, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate("/login");
  };

  const reportCount = user?.reports?.length || 3;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex items-center justify-between h-16 relative">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
            HW
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-800">HealthWise</span>
            <span className="text-sm block text-slate-500">AI</span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-black font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/features" className="hover:text-blue-600 transition">Features</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          {isLoggedIn && (
            <Link to="/result" className="hover:text-blue-600 transition">Result</Link>
          )}
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-md bg-white text-black border border-gray-300 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm px-4 py-2 rounded-md bg-white text-black border border-gray-300 hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* USER ICON BUTTON - FIXED VISIBILITY */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 hover:border-blue-500 focus:outline-none transition-all bg-transparent hover:bg-blue-50"
              >
                {/* Simple and visible user icon */}
                <svg 
                  className="w-5 h-5 text-gray-700" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>

              {/* PROFILE DROPDOWN - FIXED VISIBILITY */}
              {showProfile && (
                <div
                  ref={profileRef}
                  className="absolute right-0 top-12 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50 transition-all duration-200 ease-out"
                >
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 border-2 border-blue-200 rounded-full flex items-center justify-center">
                      <svg 
                        className="w-5 h-5 text-blue-600" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {user?.name || "Dharmpal Gour"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user?.email || "me@gmail.com"}
                      </p>
                    </div>
                  </div>

                  {/* Report Count */}
                  <div className="flex items-center gap-2 text-slate-700 text-sm mb-4">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Reports Uploaded:</span>
                    <span className="font-semibold text-blue-700">{reportCount}</span>
                  </div>

                  {/* Logout Button - FIXED VISIBILITY */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 white-50 hover:bg-white-100 text-white-700 rounded-md text-sm font-semibold border border-white-200 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" /> 
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md inline-flex items-center justify-center text-slate-700 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <nav className="flex flex-col gap-2 p-4 text-black">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
            <Link to="/features" onClick={() => setOpen(false)} className="py-2">Features</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-2">About</Link>
            {isLoggedIn && (
              <Link to="/result" onClick={() => setOpen(false)} className="py-2">Result</Link>
            )}
            <Link to="/contact" onClick={() => setOpen(false)} className="py-2">Contact</Link>

            <div className="mt-3 flex gap-3">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="flex-1 text-center py-2 rounded-md bg-white text-black border border-gray-300 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 text-center py-2 rounded-md bg-white text-black border border-gray-300 hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex-1 text-center py-2 rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 font-semibold"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}