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
  { id: "day", label: "Today" },
  { id: "week", label: "This week" },
];

export default function TrendingSection({ initialMovies }: TrendingProps) {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
  const [movies, setMovies] = useState<TransformedItem[]>(initialMovies);
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeWindowChange = async (newTimeWindow: string) => {
    if (timeWindow === newTimeWindow) return;

    setTimeWindow(newTimeWindow as "day" | "week");
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/trending?page=1&time_window=${newTimeWindow}`
      );
      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch movies for new time window:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[30px] max-w-[1200px] min-w-[1080px]">
      <div className="flex flex-row justify-start items-center gap-[30px]">
        <Text variant="h3" className="text-content-primary">
          Trending
        </Text>
        <Tabs
          tabs={trendingTabs}
          activeTab={timeWindow}
          onTabChange={handleTimeWindowChange}
        />
      </div>
      <div className="relative">
        <ItemScroll
          key={`trending-${timeWindow}`}
          initialData={movies}
          fetchUrl={`/api/trending?time_window=${timeWindow}`}
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
