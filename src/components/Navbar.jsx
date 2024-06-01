import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-10 h-10 flex justify-center rounded-lg bg-white items-center font-bold shadow-md"
      >
        <p className="blue-gradient_text">AW</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          // target="_blank"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          {/* <a target="_blank"> */}
          About
          {/* </a> */}
        </NavLink>
        <NavLink
          to="/projects"
          // target="_blank"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
        >
          {/* <a target="_blank"> */}
          Projects
          {/* </a> */}
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
