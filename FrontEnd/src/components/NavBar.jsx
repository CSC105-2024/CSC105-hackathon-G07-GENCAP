import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { User, Menu, X, Settings, LogOut } from "lucide-react";
const NavBar = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveLink = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path === "/vocab") return "Vocab";
    return "";
  };
  const activeLink = getActiveLink();

  const handleLogout = async () => {
    try {

      setIsUserSignedIn(false);
      setShowDropDown(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggle dropdown
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleHome = () => {
    setShowDropDown(false);
    navigate("/");
  };
  const handleVocab = () => {
    setShowDropDown(false);
    navigate("/vocab");
  };
  const handleSignIn = () => {
    setShowDropDown(false);
    navigate("/signIn");
  };
  const handleSignUp = () => {
    setShowDropDown(false);
    navigate("signUp");
  };
  return (
    <div className="bg-white  shadow-lg backdrop-blur-sm border-b border-white/10 relative z-50 font-russo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={handleHome} className="group focus:outline-none">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                GENCAP
              </h1>
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-8">
            <button
              onClick={handleHome}
              className={`text-lg font-medium transition-all duration-300 hover:text-[#ab49de] border-b-2 
  ${activeLink === "Home"
                  ? "border-purple-900 text-purple-900 cursor-pointer pb-1"
                  : "border-transparent text-gray-400 hover:border-[#ab49de] hover:text-[#ab49de]"
                } hover:scale-105 focus:outline-none`}
            >
              Home
            </button>
            <button
              onClick={handleVocab}
              className={`text-lg font-medium transition-all duration-300 hover:text-[#ab49de] border-b-2 
  ${activeLink === "Vocab"
                  ? "border-purple-900 text-purple-900 cursor-pointer pb-1"
                  : "border-transparent text-gray-400 hover:border-[#ab49de] hover:text-[[#ab49de]"
                } hover:scale-105 focus:outline-none`}
            >
              Vocab
            </button>
          </div>

          <div className="flex items-center">
            {isUserSignedIn ? (
              // Signed In Version
              <div className="relative">
                <button
                  onClick={toggleDropDown}
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#CBEA7B] to-[#A5D65A] hover:from-[#A5D65A] hover:to-[#CBEA7B] transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CBEA7B]/50 ${showDropDown ? "ring-2 ring-[#CBEA7B]/70" : ""
                    }`}
                >
                  <User className="w-5 h-5 text-[#1A3129]" />
                </button>

                {/* User Dropdown */}
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 py-2 z-[9999] transform transition-all duration-200 ${showDropDown
                      ? "visible opacity-100 translate-y-0 animate-in slide-in-from-top-2"
                      : "invisible opacity-0 -translate-y-2"
                    }`}
                  style={{ zIndex: 9999 }}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              // Not Signed In Version
              <>
                {!isMobile ? (
                  // Desktop buttons
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSignIn}
                      className="px-6 py-2.5 bg-white/90 backdrop-blur-sm text-[#1A3129] rounded-lg font-medium hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={handleSignUp}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-pink-400 hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CBEA7B]/50"
                    >
                      Sign up
                    </button>
                  </div>
                ) : (
                  // Mobile hamburger menu
                  <div className="relative">
                    <button
                      onClick={toggleDropDown}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      {showDropDown ? (
                        <X className="w-5 h-5 text-white" />
                      ) : (
                        <Menu className="w-5 h-5 text-white" />
                      )}
                    </button>

                    {/* Mobile Dropdown */}
                    {showDropDown && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 py-2 z-[9999] transform transition-all duration-200 animate-in slide-in-from-top-2"
                        style={{ zIndex: 9999 }}
                      >
                        <button
                          onClick={handleSignIn}
                          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1A3129] transition-colors duration-200 focus:outline-none focus:bg-gray-100"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Sign in
                        </button>
                        <button
                          onClick={handleSignUp}
                          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-[#CBEA7B]/20 hover:text-[#1A3129] transition-colors duration-200 focus:outline-none focus:bg-[#CBEA7B]/20"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Sign up
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
