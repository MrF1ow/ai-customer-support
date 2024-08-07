import { AppButtonProps } from "@/types";
import React from "react";

const AppButton: React.FC<AppButtonProps> = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AppButton;
