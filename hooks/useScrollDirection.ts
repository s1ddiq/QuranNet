import React, { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      let currentScrollY = window.scrollY;

      if (previousScrollY < currentScrollY) {
        // Scrolling down
        setShow(false);
      } else {
        // Scroling up
        setShow(true);
      }
      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return show;
};

export default useScrollDirection;
