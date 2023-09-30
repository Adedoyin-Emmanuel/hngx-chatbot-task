import React from "react";
import "./ButtonStyle.css";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button
      className={`bg-sky-400 text-white p-3 capitalize text-[16px] rounded border-transparent border-4 hover:border-sky-300 transition-all duration-100 ease-linear ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
