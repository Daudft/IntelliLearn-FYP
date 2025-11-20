export default function Hero() {
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 md:pt-40 pb-52">

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
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
        <div className="flex items-center gap-4 mt-8">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-7 py-3 rounded-xl transition">
            Book a Call
          </button>

          <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-7 py-3 rounded-xl transition">
            Our Work
          </button>
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
