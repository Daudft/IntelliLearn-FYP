import { Link } from "react-router-dom";
import { useState } from "react";

export default function Hero() {
  const [hoveredButton, setHoveredButton] = useState(false);
  return (
    <section className="relative w-full overflow-hidden rounded-2xl">

      {/* HERO BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?q=80&w=1746&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="Hero Background"
        />
      </div>

      {/* OVERLAY (OPTIONAL FADE LEFT) */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div> */}

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl px-6 md:pl-40 pt-24 md:pt-40 pb-52">


        <h1 className=" text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Expert insights.
          <br />
          Custom solutions.
        </h1>

        <p className="text-gray-700 mt-6 text-lg max-w-xl">
          Easily adapt to changes and scale your operations with our flexible
          infrastructure, designed to support your learning and skills
          improvement.
        </p>

        {/* BUTTONS */}
       {/* SINGLE GET STARTED BUTTON */}
<div className="mt-8">
  <a href="/signup">
    <button 
      onMouseEnter={() => setHoveredButton(true)}
      onMouseLeave={() => setHoveredButton(false)}
      className="relative bg-[#E6FF03] text-black font-semibold px-8 py-3 rounded-xl flex items-center gap-2 text-lg overflow-hidden"
    >
      <span className={`inline-flex items-center gap-2 transition-all duration-500 ${hoveredButton ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"}`}>
        Get Started
        <span className="w-4 h-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </span>

      <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ${hoveredButton ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        Get Started
        <span className="w-4 h-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </span>
    </button>
  </a>
</div>


        {/* PEOPLE + TRUST */}
        <div className="flex items-center gap-4 mt-10">
          <div className="flex -space-x-4">
            <img src="https://i.pravatar.cc/50?img=1" className="w-12 h-12 rounded-full border-2 border-white" />
            <img src="https://i.pravatar.cc/50?img=2" className="w-12 h-12 rounded-full border-2 border-white" />
            <img src="https://i.pravatar.cc/50?img=3" className="w-12 h-12 rounded-full border-2 border-white" />
          </div>

          <p className="text-gray-700 font-medium">
            <span className="font-bold">100+</span> consultants trust IntelliLearn.
          </p>
        </div>

      </div>
    </section>
  );
}
