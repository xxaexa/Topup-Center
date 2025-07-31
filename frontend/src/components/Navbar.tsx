import { FaBars } from "react-icons/fa";
import { ClickProps } from "../types";

const Navbar = ({ onClick }: ClickProps) => {
  return (
    <header className="bg-navbar text-text px-4 py-2 shadow flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={onClick} className="text-xl md:hidden cursor-pointer">
          <FaBars />
        </button>
        <span className="font-bold ">Dashboard</span>
      </div>
    </header>
  );
};

export default Navbar;
