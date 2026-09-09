import React from "react";


// const Stat: React.FC<StatProps> = ({ number, label }) => {
//   return (
//     <div className="flex flex-col justify-center items-center gap-2">
//       <span className="text-4xl font-extrabold tracking-tight sm:text-[54px]">
//         {number}
//       </span>
//       <span className="text-white text-[32px] font-bold">{label}</span>
//     </div>
//   );
// };

const Commingsoon: React.FC = () => {
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden bg-neutral-950 text-white flex justify-center items-center">
      <div className="absolute inset-0">
        <img
          src="image 3.png"
          alt="پس‌زمینه قهرمان"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* Vignette + gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <div className="flex justify-center items-center">
        {/* Right: Glass card */}
        <div className="flex items-center justify-start md:justify-end">
          <div className="max-w-xl h-auto rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] md:p-10 flex flex-col justify-between items-end gap-8">
            <h1 className="w-full flex flex-col justify-center items-center text-3xl leading-tight tracking-tight sm:text-4xl gap-3" dir="rtl">
              به زودی ...
            </h1>
            <p>این صفحه در حال آماده سازی است</p>
            <div className="w-full flex justify-center items-center gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-inner transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                بازگشت به صفحه اصلی
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent md:inset-x-10" />
    </section>
  );
};

export default Commingsoon;
