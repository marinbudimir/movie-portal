"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  autoFocus = true,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="relative">
      <div className="relative flex items-center h-[45px]">
        <div className="absolute left-2">
          <Image
            src="/search.svg"
            alt="Search icon"
            width={20}
            height={20}
            className="dark:invert opacity-60"
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full pl-[36px] bg-surface-gray border border-border-low-contrast text-content-primary focus:outline-none"
        />
      </div>
    </div>
  );
}
