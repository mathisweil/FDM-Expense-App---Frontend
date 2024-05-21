"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: "submit" | "button" | "reset";
  style?: string;
}

const Button = ({ onClick, text, type, style }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`rounded-lg text-center bg-fdm-gradient text-white p-[6px] hover:scale-[1.01] transition-transform duration-300 hover:shadow-md ${style}`}
      type={`${type ? type : "button"}`}
      onClick={onClick}
      disabled={pending}
    >
      {text}
    </button>
  );
};

export default Button;
