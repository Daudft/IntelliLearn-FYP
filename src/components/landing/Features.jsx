import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FeatureItem = ({ feature, index, active, setActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  
  useEffect(() => {
    if (isInView) setActive(index);
  }, [isInView, index, setActive]);
  
  const isActive = active === index;

  return (
    <div
      ref={ref}
      className={`relative pl-8 py-6 transition-opacity duration-500 border-l-2 ${
        isActive ? "border-green-500 opacity-100" : "border-white/10 opacity-30"
      }`}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
        {feature.title}
      </h3>
      
      <p className={`text-base text-gray-400 leading-relaxed max-w-md transition-all duration-500 ${
        isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 h-0 overflow-hidden"
      }`}>
        {feature.desc}
      </p>
    </div>
  );
};

export default function Features() {
  const [active, setActive] = useState(0);
  const gridRef = useRef(null);

  const features = [
    {
      title: "Zero Configuration",
      desc: "Automatically detect metrics and performance patterns using AI without manual setup.",
      img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop", 
    },
    {
      title: "Auto Correlation",
      desc: "Instantly analyze all learning behaviors and reveal hidden insights across your data.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit-crop", 
    },
    {
      title: "Slack Native",
      desc: "Get AI-generated alerts and reports instantly inside your daily Slack workflows.",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit-crop", 
    },
    {
      title: "Incident Assistant",
      desc: "AI suggests solutions and learning adjustments automatically when issues arise.",
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1170&auto=format&fit-crop", 
    },
  ];

  return (
    <div> 
      <section 
        className="relative w-full bg-black border border-white/10 my-5 rounded-2xl overflow-hidden"
      >
        
        {/* BACKGROUND GRIDS */}
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="absolute inset-0 opacity-3 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* INNER CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Section Title */}
          <div className="pt-20 pb-12 px-6 md:px-10"> 
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful AI Features
            </h2>
            <p className="text-gray-400 max-w-lg text-lg">
              Experience the next generation of learning intelligence.
            </p>
          </div>

          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 px-6 md:px-10 pb-10">
            
            {/* LEFT SIDE: SCROLLABLE LIST */}
            <div className="flex-1 min-h-[600px] lg:min-h-[700px] lg:max-h-[700px] lg:overflow-y-auto pr-4">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  feature={feature}
                  index={index}
                  active={active}
                  setActive={setActive}
                />
              ))}
            </div>

            {/* RIGHT SIDE: STICKY IMAGE CONTAINER */}
            <div className="hidden lg:flex flex-1 sticky top-0 items-start justify-center pt-0">
              
              <div className="relative w-full max-w-[450px] h-[480px]">
                <div className="absolute -inset-5 bg-gradient-to-b from-green-500/30 to-transparent blur-[80px] rounded-full pointer-events-none" />

                <div className="relative w-full h-full bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-20 pointer-events-none" />
                  
                  {/* IMAGE STACK */}
                  {features.map((feature, index) => (
                    <motion.img
                      key={index}
                      src={feature.img}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ 
                        opacity: active === index ? 1 : 0,
                        scale: active === index ? 1 : 1.1 
                      }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  ))}

                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 z-30 bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-xl flex items-center gap-4">
                    <span className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_15px_#22c55e]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white tracking-widest uppercase mb-1">Live Status</span>
                      <motion.span 
                        key={active} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-300"
                      >
                        {features[active].title} Active
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}