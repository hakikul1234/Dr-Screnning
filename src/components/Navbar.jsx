
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Menu,
  X,
  ScanEye,
  Upload,
  FileCheck2,
  House,
} from "lucide-react";


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();


  const closeMobileMenu = () => {
    setMobileOpen(false);
  };


  const handleLogoClick = () => {
    closeMobileMenu();
    navigate("/");
  };


  const getNavClass = ({ isActive }) => {
    return `navbar-link${isActive ? " active" : ""}`;
  };


  return (
    <>
      <header className="navbar">

        <div className="navbar-inner">

          <button
            type="button"
            className="navbar-brand"
            onClick={handleLogoClick}
            aria-label="Go to home"
          >
            <span className="navbar-logo">
              <HeartPulse size={21} strokeWidth={2.2} />
            </span>

            <span>DR Screening AI</span>
          </button>


          <nav className="navbar-links">

            <NavLink
              to="/"
              className={getNavClass}
              end
            >
              <House size={16} />
              <span>Home</span>
            </NavLink>


            <NavLink
              to="/upload"
              className={getNavClass}
            >
              <Upload size={16} />
              <span>Screen</span>
            </NavLink>


            <NavLink
              to="/processing"
              className={() =>
                `navbar-link${
                  location.pathname === "/processing"
                    ? " active"
                    : ""
                }`
              }
            >
              <ScanEye size={16} />
              <span>Analysis</span>
            </NavLink>


            <NavLink
              to="/result"
              className={getNavClass}
            >
              <FileCheck2 size={16} />
              <span>Results</span>
            </NavLink>

          </nav>


          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

      </header>


      {mobileOpen && (
        <div className="navbar-mobile-menu">

          <NavLink
            to="/"
            className={getNavClass}
            end
            onClick={closeMobileMenu}
          >
            <House size={16} />
            <span>Home</span>
          </NavLink>


          <NavLink
            to="/upload"
            className={getNavClass}
            onClick={closeMobileMenu}
          >
            <Upload size={16} />
            <span>Screen</span>
          </NavLink>


          <NavLink
            to="/processing"
            className={() =>
              `navbar-link${
                location.pathname === "/processing"
                  ? " active"
                  : ""
              }`
            }
            onClick={closeMobileMenu}
          >
            <ScanEye size={16} />
            <span>Analysis</span>
          </NavLink>


          <NavLink
            to="/result"
            className={getNavClass}
            onClick={closeMobileMenu}
          >
            <FileCheck2 size={16} />
            <span>Results</span>
          </NavLink>

        </div>
      )}
    </>
  );
};


export default Navbar;
