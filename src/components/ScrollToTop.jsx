
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


/**
 * Scrolls the window back to the top whenever the route changes,
 * so navigating from a footer link never drops the user
 * halfway down the next page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};


export default ScrollToTop;
