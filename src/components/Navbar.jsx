import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header
      className="header flex text-lg gap-7 font-medium"
      style={{ justifyContent: "flex-start" }}
    >
      <NavLink
        to="/"
        className="w-10 h-10 flex justify-center rounded-lg bg-white items-center font-bold shadow-md"
      >
        <p className="blue-gradient_text">AW</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          rel="noopener noreferrer"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 hover:bg-gray-100"
              : "text-white hover:bg-blue-600 hover-fade"
          }
          style={{
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 8,
            paddingLeft: 8,
            borderRadius: 3,
          }}
        >
          <a href="https://arifin-widyatmoko.netlify.app/about" target="_blank">
            About
          </a>
        </NavLink>
        <NavLink
          to="/projects"
          rel="noopener noreferrer"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 hover:bg-gray-100"
              : "text-white hover:bg-blue-600 hover-fade"
          }
          style={{
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 8,
            paddingLeft: 8,
            borderRadius: 3,
          }}
        >
          <a
            target="_blank"
            href="https://arifin-widyatmoko.netlify.app/projects"
          >
            Projects
          </a>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
