import { useState, useEffect } from "react";

const breakpoint = 640;

export const useResponsive = () => {
  const [wide, setWide] = useState(window.innerWidth > breakpoint);

  const handleResize = (e) => {
    setWide(e.target.innerWidth > breakpoint);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return wide ? "desktop" : "mobile";
};
