import React from "react";

const SingleHill: React.FC = () => {
  return (
    <svg viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full h-auto dark:text-[#0F0F0F] text-[var(--sephia-200)]">
      {/* Back hill */}
      <path d="M0 200 Q400 100 720 160 T1440 180 V300 H0 Z" fill="currentColor" />
    </svg>
  );
};

export default SingleHill;
