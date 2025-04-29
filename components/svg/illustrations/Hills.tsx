import React from "react";

const Hills: React.FC = () => {
  return (
    <div className="bg-[#0F0F0F] w-full">
      <svg
        viewBox="0 0 1440 300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="w-full h-auto"
      >
        {/* Back hill */}
        <path d="M0 200 Q400 100 720 160 T1440 180 V300 H0 Z" fill="#0F0F0F" />
        {/* Front hill */}
        <path d="M0 240 Q420 150 800 220 T1440 200 V300 H0 Z" fill="#18181B" />
      </svg>
    </div>
  );
};

export default Hills;
