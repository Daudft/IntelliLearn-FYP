import { useEffect, useState } from "react";

export default function Features() {

  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 🔥 Fade starts earlier & goes full black
      const fadeStart = 300;  
      const fadeEnd = 1100;   

      let opacity = (scrollY - fadeStart) / (fadeEnd - fadeStart);

      // Clamp 0 - 1
      opacity = Math.max(0, Math.min(opacity, 1));

      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="w-full py-32 px-6 transition-all duration-500"
      style={{
        backgroundColor: `rgb(0 0 0 / ${bgOpacity})`,
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* SECTION TITLE */}
        <h2 className="text-5xl font-bold mb-16"
            style={{ color: bgOpacity > 0.2 ? "white" : "black" }}>
          Why IntelliLearn?
        </h2>

        {/* BIG FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* CARD 1 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:-translate-y-3 transition transform">
            <h3 className="text-2xl font-semibold text-gray-900">AI-Powered Learning</h3>
            <p className="text-gray-600 mt-3 text-lg">
              IntelliLearn adjusts to each student’s learning style using smart AI.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:-translate-y-3 transition transform">
            <h3 className="text-2xl font-semibold text-gray-900">Smart Level Test</h3>
            <p className="text-gray-600 mt-3 text-lg">
              The system evaluates your skills and places you at the perfect starting point.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:-translate-y-3 transition transform">
            <h3 className="text-2xl font-semibold text-gray-900">Personalized Courses</h3>
            <p className="text-gray-600 mt-3 text-lg">
              Content & practice tailored exactly for your learning path.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
