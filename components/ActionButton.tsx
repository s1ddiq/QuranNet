import React from "react";

const ActionButton = ({text, onClick}: ActionButtonProps) => {
  return (
    <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center cursor-pointer transition-colors" onClick={onClick}>
      {text}
    </div>
  );
};

export default ActionButton;
