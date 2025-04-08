import { useState, useEffect } from 'react';

const useScrollHandler = (scrollElementIds: string[], targetClass: string, translateClass: string) => {
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const elements = scrollElementIds.map(id => document.getElementById(id));
    const c = document.querySelectorAll('.hide-on-scroll');

    const handleScroll = () => {
      const scrollPositions = elements.map((el) => el?.scrollTop ?? 0);
      const cy = scrollPositions[0]; // first element scroll position
      const cx = scrollPositions[1]; // second element scroll position

      // Scroll down (cy or cx increases)
      if (cy > lastScrollY || cx > lastScrollY) {
        c.forEach((i: Element) => {
          i.classList.add(targetClass);
          i.classList.add(translateClass);
        });
      }
      // Scroll up (cy or cx decreases)
      else if (cy < lastScrollY || cx < lastScrollY) {
        c.forEach((i: Element) => {
          i.classList.remove(targetClass);
          i.classList.remove(translateClass);
        });
      }

      setLastScrollY(Math.max(cy, cx)); // Update lastScrollY to the greater of cy or cx
    };

    elements.forEach(el => el?.addEventListener('scroll', handleScroll));
    return () => {
      elements.forEach(el => el?.removeEventListener('scroll', handleScroll));
    };
  }, [lastScrollY, scrollElementIds, targetClass, translateClass]);

  return null; // No UI returned from this hook
};

export default useScrollHandler;
