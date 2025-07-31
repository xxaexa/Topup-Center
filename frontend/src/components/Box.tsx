import { BoxWrapperProps } from "../types";

const Box = ({ children, className }: BoxWrapperProps) => {
  return (
    <div className={`text-text bg-box shadow rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Box;
