import { InputProps } from "../types";

const Input = ({ label, className, type, ...props }: InputProps) => {
  return (
    <div className="w-full md:w-auto">
      {label && (
        <label className="block mb-1 text-sm font-medium text-text-dark">
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        className={` outline-none 
          transition-colors duration-300 
         bg-input px-2 py-2 rounded-lg
          ${className || ""}`}
      />
    </div>
  );
};

export default Input;
