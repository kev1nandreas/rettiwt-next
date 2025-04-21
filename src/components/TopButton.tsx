/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect, useState } from "react";
import { CiCircleChevUp } from "react-icons/ci";

export const TopButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(
      '[class*="overflow-y-auto"]'
    );

    scrollContainer?.addEventListener("scroll", () => {
      setIsScrolled(scrollContainer.scrollTop > 400);
    });
  }, []);

  return (
    <div>
        <div
          className={`fixed bottom-5 right-5 z-20 transition-all duration-300 ease-in-out ${
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <button
            onClick={() => {
              const scrollContainer = document.querySelector(
                '[class*="overflow-y-auto"]'
              );
              scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="hover:-translate-y-1 rounded-full bg-blue-700 p-1 cursor-pointer transition-all duration-300">
              <CiCircleChevUp className="text-4xl text-white" />
            </div>
          </button>
        </div>
    </div>
  );
};
