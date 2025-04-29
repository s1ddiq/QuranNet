import React from "react";

const ActionButton = ({text, onClick}: ActionButtonProps) => {
  return (
    <div className="dark:bg-blue-500 bg-[var(--sephia-700)] dark:hover:bg-blue-600 text-white hover:opacity-80 text-black py-2 px-4 rounded-md cursor-pointer transition-colors" onClick={onClick}>
      {text}
    </div>
  );
};

export default ActionButton;
