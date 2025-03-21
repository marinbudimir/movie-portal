import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { getPopularMovies, getTrending, getUpcomingMovies } from "@/lib/tmdb";
import TrendingSection from "@/components/TrendingSection";
import UpcomingSection from "@/components/UpcomingSection";
import WhatsPopularSection from "@/components/WhatsPopularSection";

export default async function Home() {
  const trendingData = await getTrending("day");
  const upcomingData = await getUpcomingMovies();
  const whatsPopularData = await getPopularMovies();

  return (
    <>
      <div className="grid grid-rows">
        <div className="flex">
          <div className="flex justify-center items-center w-full h-[596px] relative">
            <Image
              src="/cover.jpg"
              alt="cover photo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-white opacity-90 dark:bg-black dark:opacity-50 z-0"></div>
            <div className="flex flex-col gap-2 z-10 relative">
              <Text variant="h1" className="text-content-primary text-center">
                Welcome.
              </Text>
              <Text variant="h4" className="text-content-primary text-center">
                Millions of movies, TV shows and people to discover. Explore
                now.
              </Text>
            </div>
          </div>
        </div>

        <div className="flex bg-background-black justify-center px-[60px] py-[50px] gap-[10px] ">
          <TrendingSection initialMovies={trendingData.results} />
        </div>
        <div className="flex bg-background-gray-light justify-center px-[60px] py-[50px] gap-[10px]">
          <UpcomingSection initialMovies={upcomingData.results} />
        </div>
        <div className="flex bg-background-black justify-center px-[60px] py-[50px] gap-[10px]">
          <WhatsPopularSection initialMovies={whatsPopularData.results} />
        </div>
      </div>
      <div className="flex bg-background-gray-light justify-center px-[60px] py-[50px] gap-[10px]">
        <div className="flex flex-col max-w-[1200px] min-w-[1080px] gap-[10px]">
          <div className="flex flex-col pl-[10px] gap-[10px]">
            <Text variant="h3" className="text-content-primary">
              Join Today
            </Text>
            <Text variant="paragraph-m" className="text-content-secondary">
              Get access to maintain your own custom personal lists, track what
              you've seen and search and filter for what to watch
              next—regardless if it's in theatres, on TV or available on popular
              streaming services like Netflix, Amazon Prime Video, FlixOlé,
              MUBI, and Zee5.
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
