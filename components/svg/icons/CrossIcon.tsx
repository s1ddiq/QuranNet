import React from 'react';

interface CrossIconProps {
  className?: string;
  onClick?: () => void; // Optional onClick prop
}

const CrossIcon: React.FC<CrossIconProps> = ({ className, onClick }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    onClick={onClick} // Attach onClick event handler
    style={{ cursor: 'pointer' }} // Make the cursor a pointer to indicate it's clickable
    className={'mr-2 dark:text-white text-black ' + className}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
      />
    </g>
  </svg>
);

export default CrossIcon;
