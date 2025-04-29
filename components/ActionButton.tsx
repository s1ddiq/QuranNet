import React from "react";

const ActionButton = ({text, onClick}: ActionButtonProps) => {
  return (
    <div className="dark:bg-blue-500 bg-white dark:hover:bg-blue-600 dark:text-white text-black py-2 px-4  cursor-pointer transition-colors" onClick={onClick}>
      {text}
    </div>
  );
};

export default ActionButton;
