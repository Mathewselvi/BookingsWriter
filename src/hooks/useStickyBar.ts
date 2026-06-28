import { useState, useEffect, useRef } from 'react';

export function useStickyBar<T extends HTMLElement>() {
  const observerRef = useRef<T | null>(null);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when main button is NOT intersecting (out of viewport)
        setIsStickyBarVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return { observerRef, isStickyBarVisible };
}
