import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SectionTitle2: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      dir="rtl"
      className={`flex items-center justify-center w-full gap-4 ${className ?? ""}`}
    >
      <div className="flex-1 h-[4px] rounded-xl bg-white shadow-[0_-4px_12px_#ffffffb3,0_4px_12px_#ffffffb3]" />

      <h2 className="text-2xl sm:text-4xl font-extrabold text-white whitespace-nowrap ">
        {children}
      </h2>

      <div className="flex-1 h-[4px] rounded-xl bg-white shadow-[0_-4px_12px_#ffffffb3,0_4px_12px_#ffffffb3]" />
    </div>
  );
};

export default SectionTitle2;
