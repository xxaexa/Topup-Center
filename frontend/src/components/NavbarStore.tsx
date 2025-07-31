import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Beranda", exact: true },
  { to: "/track", label: "Lacak" },
];

const NavbarStore = () => {
  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 shadow-md text-white bg-navbar`}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="md:flex hidden items-center space-x-4">
          <span className="text-xl font-bold ">Topup Center</span>
        </div>

        <div className="flex items-center space-x-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded dark:hover:bg-accent-dark transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default NavbarStore;
