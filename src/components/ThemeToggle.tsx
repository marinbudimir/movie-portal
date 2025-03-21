"use client";

import { useTheme } from "./ThemeProvider";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const isDark = theme === "dark";
  const isLight = theme === "light";

  return (
    <div className="flex items-center gap-[8px]">
      <button
        onClick={setDarkTheme}
        className={`p-2 rounded-lg ${
          isDark ? "border border-border-low-contrast" : ""
        }`}
      >
        <Image
          src="/moon.svg"
          alt={"Switch to dark mode"}
          width={24}
          height={24}
          className="dark:invert"
        />
      </button>
      <button
        onClick={setLightTheme}
        className={`p-2 rounded-lg ${
          isLight ? "border border-border-low-contrast" : ""
        }`}
      >
        <Image
          src="/sun.svg"
          alt={"Switch to light mode"}
          width={24}
          height={24}
          className="dark:invert"
        />
      </button>
    </div>
  );
}
