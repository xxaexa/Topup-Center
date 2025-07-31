import { ButtonProps } from "../types";

const Button = ({ text, onClick, type, className = "", icon }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`color-button md:w-36 w-full bg-input hover:bg-button-hover text-text   py-2 px-2 rounded cursor-pointer flex items-center justify-center gap-1 ${className}`}
  >
    {icon && <span className="text-2xl">{icon}</span>}
    <span>{text}</span>
  </button>
);

export default Button;
