"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchScreen } from "@/components/SearchScreen";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center w-full py-[14px] px-[40px] gap-[149px] bg-background-gray-light dark:bg-background-gray-dark z-50 relative">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={"/logo.svg"}
              alt="Logo icon"
              width={47.75}
              height={14.78}
              className="dark:invert cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors cursor-pointer"
            onClick={toggleSearch}
          >
            <Image
              src={isSearchOpen ? "/close.svg" : "/search.svg"}
              alt={isSearchOpen ? "Close search" : "Search icon"}
              width={25}
              height={24}
              className="dark:invert"
            />
          </button>
        </div>
      </header>
      <SearchScreen isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
