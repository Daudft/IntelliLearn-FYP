import { useEffect, useState } from "react";

export default function Features() {
  const [bgOpacity, setBgOpacity] = useState(0);

  // Fade to black starting at 150px
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const fadeStart = 150;
      const fadeEnd = 600;

      let opacity = (scrollY - fadeStart) / (fadeEnd - fadeStart);
      opacity = Math.min(Math.max(opacity, 0), 1);
      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="w-full py-40 px-6 transition-all duration-700"
      style={{
        backgroundColor: `rgb(0 0 0 / ${bgOpacity})`,
      }}
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Section Title */}
        <h2
          className="text-5xl font-extrabold mb-6 transition-colors duration-500"
          style={{ color: bgOpacity < 0.1 ? "black" : "white" }}
        >
          Powerful Features
        </h2>

        <p
          className="text-lg mb-40 max-w-2xl mx-auto transition-colors duration-500"
          style={{ color: bgOpacity < 0.1 ? "#333" : "#ccc" }}
        >
          Built to elevate learning with AI, insights, and adaptive courses.
        </p>

        {/* APPLE STYLE STICKY CARDS */}
        <div className="relative min-h-[260vh] w-full">

          {/* CARD 1 */}
          <div
            data-aos="fade-up"
            className="sticky top-40 max-w-3xl mx-auto p-12 rounded-3xl shadow-2xl 
                       bg-gradient-to-br from-blue-600 to-purple-600 text-white
                       transform transition-all"
          >
            <h3 className="text-3xl font-bold mb-4">AI Level Detection</h3>
            <p className="text-lg opacity-90">
              Instantly measures a student's starting level with high accuracy.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="sticky top-40 mt-[40vh] max-w-3xl mx-auto p-12 rounded-3xl 
                       shadow-2xl bg-gradient-to-br from-purple-600 to-orange-500 text-white
                       transform transition-all"
          >
            <h3 className="text-3xl font-bold mb-4">Adaptive Learning Path</h3>
            <p className="text-lg opacity-90">
              Content automatically adjusts as the student progresses.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="sticky top-40 mt-[80vh] max-w-3xl mx-auto p-12 rounded-3xl 
                       shadow-2xl bg-gradient-to-br from-yellow-500 to-red-500 text-white
                       transform transition-all"
          >
            <h3 className="text-3xl font-bold mb-4">Smart Analytics</h3>
            <p className="text-lg opacity-90">
              Real-time dashboards track goals, performance, and progress.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
