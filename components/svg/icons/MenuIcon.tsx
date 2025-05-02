import React from 'react';

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const MenuIcon: React.FC<MenuIconProps> = ({ onClick, ...props }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    onClick={onClick} // Attach the onClick prop to the SVG
    {...props} // Spread any other props to the SVG element
  >
    <g id="SVGRepo_iconCarrier">
      <path
        d="M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z"
        fill="currentColor"
      />
      <path
        d="M1 4C1 3.44772 1.44772 3 2 3H22C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5H2C1.44772 5 1 4.55228 1 4Z"
        fill="currentColor"
      />
      <path
        d="M1 20C1 19.4477 1.44772 19 2 19H22C22.5523 19 23 19.4477 23 20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default MenuIcon;
