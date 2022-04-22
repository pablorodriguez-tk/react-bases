import gsap from "gsap";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

export const useCounter = ({ maxCount = 1 }) => {
  const [counter, setCounter] = useState<number>(5);
  const elementToAnimate = useRef<any>(null);
  const tl = useRef(gsap.timeline());

  const handleClick = () => {
    setCounter((prev) => Math.min(prev + 1, maxCount));
  };

  useLayoutEffect(() => {
    if (!elementToAnimate.current) return;

    tl.current.to(elementToAnimate.current, {
      y: -10,
      duration: 0.2,
      ease: "ease.out",
    });
    tl.current
      .to(elementToAnimate.current, {
        y: 0,
        duration: 0.2,
        ease: "ease.in",
      })
      .pause();
  }, []);

  useEffect(() => {
    tl.current.play(0);
  }, [counter]);

  return { counter, handleClick, elementToAnimate };
};
