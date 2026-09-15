
import { useEffect } from "react";


/**
 * Watches every .reveal element inside the document and adds
 * .is-visible once it scrolls into view, so sections fade and
 * rise into place instead of appearing all at once.
 *
 * Re-runs whenever `deps` change, so newly rendered content
 * on a different route gets observed too.
 */
const useReveal = (deps = []) => {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));

    if (nodes.length === 0) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};


export default useReveal;
