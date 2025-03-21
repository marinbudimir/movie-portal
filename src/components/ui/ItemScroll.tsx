"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { getImageUrl, TransformedItem } from "@/lib/tmdb";

interface ItemScrollProps {
  initialData: TransformedItem[];
  fetchUrl?: string;
  key?: string;
  onItemClick?: () => void;
}

export default function ItemScroll({
  initialData,
  fetchUrl,
  onItemClick,
}: ItemScrollProps) {
  const [items, setItems] = useState<TransformedItem[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(initialData);
    setPage(1);

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [initialData]);

  const loadMoreMovies = async () => {
    if (loading || !fetchUrl) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(
        `${fetchUrl}${fetchUrl.includes("?") ? "&" : "?"}page=${nextPage}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setItems((prev) => [...prev, ...data.results]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to fetch more movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      if (isAtEnd) {
        loadMoreMovies();
      }
    }
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div
      className={`flex gap-[30px] overflow-x-auto`}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {items.map((item, index) => (
        <Link
          href={`/${item.mediaType}/${item.id}`}
          key={`${item.id}-${index}`}
          className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleItemClick}
        >
          <div className="relative w-[240px] h-[360px] rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(item.cover)}
              alt={item.title || "Movie poster"}
              width={240}
              height={360}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col py-[16px] gap-[5px]">
            <Text
              variant="title"
              className="text-content-primary truncate max-w-[240px]"
            >
              {item.title}
            </Text>
            <div className="flex justify-between">
              <Text
                variant="label-s-regular"
                className="text-content-secondary"
              >
                {item.releaseDate || item.role || ""}
              </Text>
              <Text
                variant="label-s-regular"
                className="text-content-secondary"
              >
                {item.ranking || ""}
              </Text>
            </div>
          </div>
        </Link>
      ))}
      {loading && (
        <div className="flex items-center justify-center w-[240px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
        </div>
      )}
    </div>
  );
}
