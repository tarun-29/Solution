import React, { useRef, useEffect } from "react";
import Character from '../components/Character.js';

export default function LazyLoader({ src, width, height }) {
  const ref = useRef(null);
  const io = useRef(null);

  useEffect(() => {
    if (ref.current) {
      io.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0.5) {
              ref.current.src = src;

              io.current.unobserve(ref.current);
            }
          });
        },
        {
          threshold: [0, 0.5, 1]
        }
      );

      io.current.observe(ref.current);
    }

    return () => {
      io.current.unobserve(ref.current);
    };
  }, [ref]);

  return <img ref={ref} style={{ borderRadius: 100, height: 50, width: 50 }} alt="" />;
}
