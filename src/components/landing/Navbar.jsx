export default function Navbar() {
  return (
    <div className="w-full bg-[#F1F2F4] py-4">

      {/* FULL WIDTH WHITE NAVBAR */}
      <nav className="w-full bg-white rounded-2xl shadow-sm px-8 py-4 flex items-center justify-between">

        {/* Logo (LEFT CORNER) */}
        <h1 className="text-2xl font-bold text-gray-800">
          IntelliLearn
        </h1>

        {/* Center Links */}
        <ul className="hidden md:flex items-center space-x-10 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-black">Features</li>
          <li className="cursor-pointer hover:text-black">How it Works</li>
          <li className="cursor-pointer hover:text-black">Pricing</li>
          <li className="cursor-pointer hover:text-black">Courses</li>
        </ul>

        {/* RIGHT SIDE BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Sign In (simple text button) */}
         <button className="px-5 py-2 bg-[#F5F5F5] rounded-xl text-gray-800 font-medium">
  Sign In
</button>




          {/* Sign Up (highlight button) */}
          <button className="bg-[#E6FF03] font-semibold px-6 py-2.5 rounded-xl  ">
            Sign Up
          </button>

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
