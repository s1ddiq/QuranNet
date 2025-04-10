import { useEffect, useRef } from "react";

const useScrollHandler = (
  scrollElementIds: string[],
  targetClass: [string, string, string],
  translateClass: string
) => {
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = scrollElementIds.map((id) => document.getElementById(id));
    const targets = document.querySelectorAll(".hide-on-scroll");

    const handleScroll = () => {
      const scrollPositions = elements.map((el) => el?.scrollTop ?? 0);
      const cy = scrollPositions[0];
      const cx = scrollPositions[1];
      const maxY = Math.max(cy, cx);

      if (maxY > lastScrollY.current) {
        targets.forEach((el) => {
          el.classList.add(...targetClass, translateClass);
        });
      } else if (maxY < lastScrollY.current) {
        targets.forEach((el) => {
          el.classList.remove(...targetClass, translateClass);
        });
      }

      lastScrollY.current = maxY;
    };

    elements.forEach((el) => el?.addEventListener("scroll", handleScroll));

    return () => {
      elements.forEach((el) => el?.removeEventListener("scroll", handleScroll));
    };
  }, [scrollElementIds, targetClass, translateClass]);
};

export default useScrollHandler;
