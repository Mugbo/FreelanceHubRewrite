// makes it a client side component to make use of state which cant be used ina server side component
"use client";

import { CATEGORIES } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

// Close navbar with esc keypress
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };
    document.addEventListener("keydown", handler)

// cleanup after use effect to prevent memory leaks
    return() => {
      document.removeEventListener("keydown", handler);
    }
  }, []);

  const isAnyOpen = activeIndex != null;

  const navRef = useRef<HTMLDivElement | null>(null);

  // Close Navbar on click out of context 
  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };
        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};
export default NavItems;
