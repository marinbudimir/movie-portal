"use client";

import React, { useState, useEffect } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Text } from "@/components/ui/Text";
import { searchMulti, TransformedItem } from "@/lib/tmdb";
import { useDebounce } from "@/hooks/useDebounce";
import ItemScroll from "./ui/ItemScroll";
import Link from "next/link";

interface SearchScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchScreen({ isOpen, onClose }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<TransformedItem[]>([]);
  const [tvShows, setTvShows] = useState<TransformedItem[]>([]);
  const [people, setPeople] = useState<TransformedItem[]>([]);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setMovies([]);
        setTvShows([]);
        setPeople([]);
        return;
      }

      try {
        const results = await searchMulti(debouncedSearchTerm);
        setMovies(results.movie);
        setTvShows(results.tv);
        setPeople(results.person);
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("search-screen-open");
    } else {
      document.body.classList.remove("search-screen-open");
    }
    return () => {
      document.body.classList.remove("search-screen-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-background-black overflow-y-auto"
      style={{ top: "60px" }}
    >
      <div className="flex flex-col min-w-[1080px] max-w-[1200px] justify-center mx-auto py-[25px] px-[60px] gap-[25px]">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          autoFocus={true}
        />
        {people.length > 0 && (
          <div className="flex flex-col gap-[20px]">
            <Text variant="h5" className="text-content-primary">
              Top Searched People
            </Text>
            <div className="grid grid-cols-2 grid-rows-2 gap-[20px]">
              {people.slice(0, 4).map((person) => (
                <Link
                  key={person.id}
                  href={`/${person.mediaType}/${person.id}`}
                  onClick={onClose}
                  className="flex px-[10px] py-[20px] border border-border-low-contrast text-content-primary cursor-pointer"
                >
                  {person.title}
                </Link>
              ))}
            </div>
          </div>
        )}
        {movies.length > 0 && (
          <div className="flex flex-col gap-[20px]">
            <Text variant="h5" className="text-content-primary">
              Top Searched Movies
            </Text>
            <ItemScroll initialData={movies} onItemClick={onClose} />
          </div>
        )}
        {tvShows.length > 0 && (
          <div className="flex flex-col gap-[20px]">
            <Text variant="h5" className="text-content-primary">
              Top Searched TV Shows
            </Text>
            <ItemScroll initialData={tvShows} onItemClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
}
