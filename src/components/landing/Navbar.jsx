import { useState } from "react";

export default function Navbar() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="w-full bg-[#F1F2F4] py-4">

      {/* FULL WIDTH WHITE NAVBAR */}
      <nav className="w-full bg-white rounded-2xl shadow-sm px-8 py-4 flex items-center justify-between">

        {/* Logo (LEFT CORNER) */}
        <a href="/">
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
            IntelliLearn
          </h1>
        </a>

        {/* Center Links */}
        <ul className="hidden md:flex items-center space-x-10 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-black">Features</li>
          <li className="cursor-pointer hover:text-black">How it Works</li>
          <li className="cursor-pointer hover:text-black">Pricing</li>
          <li className="cursor-pointer hover:text-black">Courses</li>
        </ul>

        {/* RIGHT SIDE BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Sign In Button */}
          <a href="/signin">
            <button 
              onMouseEnter={() => setHoveredButton("signin")}
              onMouseLeave={() => setHoveredButton(null)}
              className="relative px-5 py-2 bg-[#F5F5F5] rounded-xl text-gray-800 font-medium overflow-hidden"
            >
              <span className={`inline-block transition-all duration-500 ${hoveredButton === "signin" ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}>
                Sign In
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredButton === "signin" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                Sign In
              </span>
            </button>
          </a>

          {/* Sign Up Button */}
          <a href="/signup">
            <button 
              onMouseEnter={() => setHoveredButton("signup")}
              onMouseLeave={() => setHoveredButton(null)}
              className="relative bg-[#E6FF03] font-semibold px-6 py-2.5 rounded-xl overflow-hidden"
            >
              <span className={`inline-block transition-all duration-500 ${hoveredButton === "signup" ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}>
                Sign Up
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredButton === "signup" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                Sign Up
              </span>
            </button>
          </a>

        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <svg width="26" height="26" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="7" x2="23" y2="7" />
            <line x1="3" y1="13" x2="23" y2="13" />
            <line x1="3" y1="19" x2="23" y2="19" />
          </svg>
        </div>

      </nav>
    </div>
  );
}