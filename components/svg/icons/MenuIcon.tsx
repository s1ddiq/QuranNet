import React from "react";

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  onClick,
  className = "",
  ...props
}) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    {...props}
  >
    <line x1="2" y1="5" x2="22" y2="5" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="19" x2="22" y2="19" />
  </svg>
);

export default MenuIcon;
