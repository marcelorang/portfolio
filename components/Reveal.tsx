"use client";

import { useEffect } from "react";

// Adds `is-visible` to every [data-reveal] element as it scrolls into view.
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
