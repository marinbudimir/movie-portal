"use client";

import { useState } from "react";
import { Text } from "@/components/ui/Text";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import ItemScroll from "@/components/ui/ItemScroll";
import { TransformedItem } from "@/lib/tmdb";

interface TrendingProps {
  initialMovies: TransformedItem[];
}

const trendingTabs: TabItem[] = [
  { id: "movie", label: "Movies" },
  { id: "tv", label: "On TV" },
  { id: "person", label: "People" },
];

export default function WhatsPopularSection({ initialMovies }: TrendingProps) {
  const [category, setCategory] = useState<"movie" | "tv" | "person">("movie");
  const [movies, setMovies] = useState<TransformedItem[]>(initialMovies);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = async (newCategory: string) => {
    if (category === newCategory) return;

    setCategory(newCategory as "movie" | "tv" | "person");
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/popular?page=1&category=${newCategory}`
      );
      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch movies for new category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[30px] max-w-[1200px] min-w-[1080px]">
      <div className="flex flex-row justify-between items-center gap-[30px]">
        <Text variant="h3" className="text-content-primary">
          What's Popular
        </Text>
        <Tabs
          tabs={trendingTabs}
          activeTab={category}
          onTabChange={handleCategoryChange}
        />
      </div>
      <div className="relative">
        <ItemScroll
          key={`popular-${category}`}
          initialData={movies}
          fetchUrl={`/api/popular?category=${category}`}
        />

        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        )}
      </div>
    </div>
  );
}
