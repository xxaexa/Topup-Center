import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaChartBar } from "react-icons/fa";
import { toast } from "react-toastify/unstyled";
import { ClickProps } from "../types";

const Sidebar = ({ onClick }: ClickProps) => {
  const navigate = useNavigate();

  // Ambil user dari localStorage
  const userString = localStorage.getItem("user");
  let userName = "";
  if (userString) {
    try {
      const parsed = JSON.parse(userString);
      userName = parsed?.user?.name || "";
    } catch (error) {
      console.error("Error parsing user:", error);
    }
  }

  const handleLogout = async () => {
    try {
      toast.success("Logout Berhasil");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links =
    userName.toLowerCase() === "owner"
      ? [
          {
            to: "/dashboard/report",
            label: "Laporan",
            icon: <FaChartBar />,
          },
        ]
      : [
          {
            to: "/dashboard/",
            label: "Home",
            icon: <FaChartBar />,
            exact: true,
          },
          { to: "/dashboard/voucher", label: "Voucher", icon: <FaChartBar /> },
          {
            to: "/dashboard/transaction",
            label: "Transaction",
            icon: <FaChartBar />,
          },
        ];

  return (
    <aside className="bg-navbar md:w-64 h-full pt-12 md:pt-0  flex flex-col ">
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-accent-dark transition-colors ${
                isActive ? "bg-button-hover text-gray-200" : ""
              }`
            }
            onClick={onClick}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="p-2">
        <button
          onClick={async () => {
            await handleLogout();
            if (onClick) onClick();
          }}
          className="cursor-pointer flex items-center gap-2 w-full p-2 rounded hover:bg-red-600 text-white bg-red-500 transition-colors"
        >
          Logout <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
