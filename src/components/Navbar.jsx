
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ScanEye,
  Upload,
  FileCheck2,
  House,
  BookOpen,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";


const NAV_ITEMS = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/upload", label: "Screen", icon: Upload },
  { to: "/processing", label: "Analysis", icon: ScanEye },
  { to: "/result", label: "Results", icon: FileCheck2 },
  { to: "/docs", label: "Docs", icon: BookOpen },
];


const RetinaMark = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="16"
      cy="16"
      r="13"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.45"
    />
    <circle
      cx="16"
      cy="16"
      r="7.5"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <circle cx="16" cy="16" r="3" fill="currentColor" />
    <path
      d="M16 3v3.5M16 25.5V29M3 16h3.5M25.5 16H29"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.localStorage.getItem("dr-screening-theme") || "light";
  });

  const navigate = useNavigate();


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("dr-screening-theme", theme);
  }, [theme]);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const toggleTheme = () => {
    setTheme((previous) => (previous === "dark" ? "light" : "dark"));
  };


  const closeMobileMenu = () => setMobileOpen(false);


  const handleLogoClick = () => {
    closeMobileMenu();
    navigate("/");
  };


  const renderLink = (item, onClick) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={onClick}
        className={({ isActive }) =>
          `navbar-link${isActive ? " active" : ""}`
        }
      >
        <span className="navbar-link-icon">
          <Icon size={16} />
        </span>

        <span>{item.label}</span>
      </NavLink>
    );
  };


  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : ""}`}>

        <div className="navbar-inner">

          <button
            type="button"
            className="navbar-brand"
            onClick={handleLogoClick}
            aria-label="Go to home"
          >
            <span className="navbar-logo">
              <RetinaMark />
            </span>

            <span className="navbar-brand-text">
              <span className="navbar-brand-name">
                DR Screening
                <span className="navbar-brand-accent">AI</span>
              </span>

              <span className="navbar-brand-sub">
                Retinal Intelligence
              </span>
            </span>
          </button>


          <nav className="navbar-links">
            {NAV_ITEMS.map((item) => renderLink(item))}
          </nav>


          <div className="navbar-actions">

            <button
              type="button"
              className="theme-toggle-button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}
            </button>


            <button
              type="button"
              className="navbar-cta"
              onClick={() => {
                closeMobileMenu();
                navigate("/upload");
              }}
            >
              Start Screening
              <ArrowRight size={15} />
            </button>


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
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>

      </header>


      {mobileOpen && (
        <div className="navbar-mobile-menu">

          {NAV_ITEMS.map((item) => renderLink(item, closeMobileMenu))}

          <button
            type="button"
            className="btn btn-primary navbar-mobile-cta"
            onClick={() => {
              closeMobileMenu();
              navigate("/upload");
            }}
          >
            Start Screening
            <ArrowRight size={16} />
          </button>

        </div>
      )}
    </>
  );
};


export default Navbar;
