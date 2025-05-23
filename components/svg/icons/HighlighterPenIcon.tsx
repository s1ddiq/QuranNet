import React from 'react';

interface HighlighterPenIconProps extends React.SVGProps<SVGSVGElement> {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const HighlighterPenIcon: React.FC<HighlighterPenIconProps> = ({ onClick, ...props }) => (
  <svg
    fill="currentColor"
    width="22"
    height="22"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    onClick={onClick} // Attach the onClick prop to the SVG
    className='dark:text-white text-gray-600 cursor-pointer'
    {...props} // Spread any other props to the SVG element
  >
    <g id="SVGRepo_iconCarrier">
      <g id="Highlighter_pen">
        <path d="M451.4692,125.4041,380.5656,54.5016a13.1093,13.1093,0,0,0-17.7457-.7327L164.9985,221.3722,284.6018,340.9744l167.6-197.8225A13.11,13.11,0,0,0,451.4692,125.4041Z" />
        <rect
          height="172.7608"
          transform="translate(-166.0416 227.6148) rotate(-45)"
          width="41.0143"
          x="171.2274"
          y="227.8569"
        />
        <path d="M94.5521,363.7306,142.2413,411.42c18.5232-11.008,40.65-15.58,63.1619-17.3911l-93.46-93.46C110.1316,323.08,105.56,345.2073,94.5521,363.7306Z" />
        <path d="M58.6143,403.6279a6.5743,6.5743,0,0,0-1.2732,7.5013l22.3748,46.4866a6.5746,6.5746,0,0,0,10.5723,1.7965l31.4111-31.4111L77.9706,384.2726Z" />
      </g>
    </g>
  </svg>
);

export default HighlighterPenIcon;
