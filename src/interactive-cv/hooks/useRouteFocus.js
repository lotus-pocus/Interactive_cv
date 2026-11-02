import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// After an in-app navigation, scroll to the top and move focus to the page's
// <h1 tabIndex={-1}> so screen readers announce the new screen. A fresh page
// load (location key "default") is left alone. Returns a ref for the container.
export default function useRouteFocus() {
  const { pathname, key } = useLocation();
  const containerRef = useRef(null);
  const handledPath = useRef(key === "default" ? pathname : null);

  useEffect(() => {
    if (handledPath.current === pathname) return;
    handledPath.current = pathname;
    window.scrollTo(0, 0);
    containerRef.current?.querySelector("h1")?.focus();
  }, [pathname]);

  return containerRef;
}
