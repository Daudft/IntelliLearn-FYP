import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const gridRef = useRef(null);

  const steps = [
    {
      number: "01",
      title: "Enroll in a Course",
      desc: "Browse through our comprehensive catalog of courses and find the perfect learning path for your goals.",
      icon: "📚",
    },
    {
      number: "02",
      title: "Learn at Your Pace",
      desc: "Access interactive lessons, video tutorials, and hands-on projects available 24/7 from anywhere.",
      icon: "⚡",
    },
    {
      number: "03",
      title: "Track Progress",
      desc: "Monitor your learning journey with detailed analytics and personalized insights about your growth.",
      icon: "📊",
    },
    {
      number: "04",
      title: "Earn Certificate",
      desc: "Complete courses and earn industry-recognized certificates to showcase your new skills.",
      icon: "✓",
    },
  ];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleMove = (e) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      grid.style.setProperty("--x", `${x}px`);
      grid.style.setProperty("--y", `${y}px`);
    };

    grid.addEventListener("mousemove", handleMove);
    return () => grid.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div>
      <section 
        className="relative w-full bg-white border border-gray-200 my-5 rounded-2xl overflow-hidden"
      >
        
        {/* BACKGROUND GRIDS */}
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-20 pointer-events-auto"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(34,197,94,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34,197,94,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 35%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 35%, transparent 55%)",
          }}
        ></div>

        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34,197,94,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,197,94,0.2) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* INNER CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Section Title */}
          <div className="pt-32 pb-20 px-6 md:px-10">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-black mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-gray-700 max-w-lg text-lg"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Simple, powerful, and intuitive. Get up and running in 4 easy steps.
            </motion.p>
          </div>

          {/* Steps Grid */}
          <div className="px-6 md:px-10 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {steps.map((step, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative group"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300/20 to-green-300/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Card */}
                    <motion.div 
                      className="relative p-10 bg-white backdrop-blur border border-gray-200 rounded-2xl hover:border-yellow-200 hover:shadow-md transition-all duration-300 h-full"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      
                      {/* Step Number */}
                      <motion.div 
                        className="text-5xl font-bold text-yellow-300/60 mb-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {step.number}
                      </motion.div>

                      {/* Icon */}
                      <motion.div 
                        className="mb-4 p-3 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-lg w-fit text-3xl"
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.1, type: "spring" }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        {step.icon}
                      </motion.div>

                      {/* Title */}
                      <motion.h3 
                        className="text-xl font-bold text-black mb-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.15 }}
                        viewport={{ once: true }}
                      >
                        {step.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p 
                        className="text-sm text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        {step.desc}
                      </motion.p>

                      {/* Arrow Connector */}
                      {index < steps.length - 1 && (
                        <motion.div 
                          className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-2xl text-yellow-300/40"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}