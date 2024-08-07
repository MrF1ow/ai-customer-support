import { AppButtonProps } from "@/types";
import React from "react";

const AppButton: React.FC<AppButtonProps> = ({ type, text, onClick, size }) => {

  const buttonSize = () => {
    switch (size) {
      case "sm":
        return "py-1 px-2 text-sm";
      case "md":
        return "py-2 px-4 text-md";
      case "lg":
        return "py-3 px-6 text-lg";
      case "xl":
        return "py-4 px-8 text-xl";
      default:
        return "py-2 px-4 text-md";
    }
  };

  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-transparent text-white font-semibold hover:text-white border border-blue-500 hover:border-blue-500 rounded transition-all duration-150 ease-in-out ${buttonSize()}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AppButton;
