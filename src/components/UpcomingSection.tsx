"use client";

import { Text } from "@/components/ui/Text";
import ItemScroll from "@/components/ui/ItemScroll";
import { TransformedItem } from "@/lib/tmdb";

interface UpcomingProps {
  initialMovies: TransformedItem[];
}

export default function UpcomingSection({ initialMovies }: UpcomingProps) {
  return (
    <div className="flex flex-col gap-[30px] max-w-[1200px] min-w-[1080px]">
      <div className="flex flex-row justify-start items-center gap-[30px]">
        <Text variant="h3" className="text-content-primary">
          Upcoming
        </Text>
      </div>
      <ItemScroll initialData={initialMovies} fetchUrl="/api/upcoming" />
    </div>
  );
}
