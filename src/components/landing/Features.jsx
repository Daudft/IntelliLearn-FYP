import { useEffect, useRef, useState } from "react";

export default function Features() {
  const [active, setActive] = useState(0);
  const cardRef = useRef(null);
  const refs = useRef([]);

  const features = [
    { title: "Zero Configuration Setup", desc: "Automatically detect metrics and performance patterns using AI." },
    { title: "Auto Correlation", desc: "Instantly analyze all learning behaviors and reveal hidden insights." },
    { title: "Slack Native", desc: "Get AI-generated alerts instantly inside Slack." },
    { title: "Incident Assistant", desc: "AI suggests solutions and learning adjustments automatically." },
  ];

  /* ⭐ Scroll highlight switching */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!isNaN(index)) setActive(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => refs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  /* ⭐ Parallax effect on right card */
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const offset = window.scrollY * 0.05;
      cardRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ⭐ Mouse grid glow interaction */
  useEffect(() => {
    const grid = document.getElementById("premium-grid");
    if (!grid) return;

    const handleMove = (e) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const moveX = (x - rect.width / 2) * 0.01;
      const moveY = (y - rect.height / 2) * 0.01;
      grid.style.transform = `translate(${moveX}px, ${moveY}px)`;

      grid.style.setProperty("--x", `${x}px`);
      grid.style.setProperty("--y", `${y}px`);
      grid.classList.add("grid-glow");
    };

    const removeGlow = () => {
      grid.classList.remove("grid-glow");
      grid.style.transform = "translate(0px, 0px)";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", removeGlow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", removeGlow);
    };
  }, []);

  /* ⭐ Hover drift effect */
  const handleMouseMove = (e, i) => {
    const el = refs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const moveX = (e.clientX - rect.left - rect.width / 2) * 0.02;
    el.style.transform = `translateX(${moveX}px)`;
  };

  const handleMouseLeave = (i) => {
    const el = refs.current[i];
    if (el) el.style.transform = "translateX(0px)";
  };

  return (
    <section className="relative w-full bg-black text-white pt-[180px] pb-[250px] px-6 md:px-20 overflow-hidden">

      {/* ⭐ BACKGROUND GRID */}
      <div 
        id="premium-grid"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
      ></div>

      {/* ⭐ RANDOM PARTICLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] bg-white/40 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              opacity: Math.random(),
            }}
          ></div>
        ))}
      </div>

      {/* ⭐ MAIN CONTENT GRID */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

        {/* LEFT — FEATURE LIST */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful AI Features</h2>
          <p className="text-gray-400 mb-20 max-w-md">
            AI-driven insights designed for modern learning systems.
          </p>

          <div className="space-y-10">
            {features.map((f, i) => (
              <div key={i} className="h-[70px] flex items-start">
                <div
                  ref={(el) => (refs.current[i] = el)}
                  data-index={i}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  
                  className={`transition-all duration-500 cursor-pointer ${
                    active === i ? "opacity-100 scale-[1.05]" : "opacity-40 scale-[1]"
                  }`}
                >
                  {/* DOT + TITLE */}
                  <div className="flex items-center gap-3">
                    {/* ⭐ Animated Dot */}
                    <div
                      className={`
                        w-3 h-3 rounded-full transition-all duration-500 
                        ${active === i ? "bg-blue-500 shadow-[0_0_12px_rgba(0,120,255,0.8)] scale-125" : "bg-gray-600"}
                      `}
                    ></div>

                    {/* ⭐ Animated Title */}
                    <h3
                      className={`
                        text-xl font-semibold transition-all duration-500 
                        ${active === i ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-40"}
                      `}
                    >
                      {f.title}
                    </h3>
                  </div>

                  {/* ⭐ Animated Description */}
                  <p
                    className={`
                      text-gray-400 ml-7 mt-3 max-w-sm transition-all duration-700 
                      ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
                    `}
                  >
                    {f.desc}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ⭐ RIGHT — AI DASHBOARD */}
        <div className="relative">
          <div
            ref={cardRef}
            className="relative bg-[#0d0d0d] border border-white/10 rounded-3xl shadow-2xl 
                       backdrop-blur-xl w-full h-[430px] p-8 transition-transform duration-700 ease-out 
                       animate-smoothFloat"
          >
            <img
              src="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full rounded-xl object-cover opacity-90"
            />
          </div>
        </div>
      </div>

      {/* ⭐ EXTRA CSS */}
      <style>{`
        #premium-grid {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px);
          background-size: 90px 90px;
          transition: transform 0.15s ease-out;
        }

        #premium-grid.grid-glow {
          background-image:
            radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 40%),
            linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px);
        }

        @keyframes smoothFloat {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.01); }
          100% { transform: translateY(0px) scale(1); }
        }
      `}</style>
    </section>
  );
}
