import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";
import ItemScroll from "@/components/ui/ItemScroll";
import { Tags } from "@/components/ui/Tags";
import { Button } from "@/components/ui/Button";

interface DetailsPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { type, id } = await params;
  const movieDetails = await getMovieDetails(id, type);

  return (
    <div className="grid grid-rows bg-background-black">
      <div className="flex justify-center items-center w-full h-[596px] relative">
        <Image
          src="/cover.jpg"
          alt="cover photo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white opacity-90 dark:bg-black dark:opacity-50 z-0"></div>
        <div className="flex gap-[30px] max-w-[1200px] min-w-[1080px] z-10">
          <div className=" rounded-lg w-[324px] h-[486px] overflow-hidden relative flex-shrink-0">
            <Image
              src={getImageUrl(movieDetails.cover)}
              alt={movieDetails.title || "Movie poster"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-[37px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[20px]">
                <Text variant="h3" className="text-content-primary">
                  {movieDetails.title}
                </Text>
                <Text variant="h3" className="text-content-secondary">
                  ({movieDetails.releaseYear})
                </Text>
              </div>
              <div className="flex justify-between">
                <Text
                  variant="label-m-regular"
                  className="text-content-secondary"
                >
                  {movieDetails.genres
                    .map((genre: any) => genre.name)
                    .join(", ")}
                </Text>
                <Text
                  variant="label-m-regular"
                  className="text-content-secondary"
                >
                  {movieDetails.ranking}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-[5px]">
              <Text variant="h5" className="text-content-primary">
                Overview
              </Text>
              <Text variant="paragraph-m" className="text-content-secondary">
                {movieDetails.overview}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-[60px] py-[50px] gap-[10px] justify-center">
        <div className="flex gap-[30px] max-w-[1200px] min-w-[1080px]">
          <div className="flex flex-col gap-[50px] overflow-x-auto">
            <div className="flex flex-col gap-[30px]">
              <Text variant="h3" className="text-content-primary">
                Cast
              </Text>
              <div className="flex gap-[30px]">
                <ItemScroll initialData={movieDetails.cast} />
              </div>
              <div className="flex flex-col gap-[30px]">
                <Text variant="h3" className="text-content-primary">
                  Media
                </Text>
                <Text variant="h5" className="text-content-secondary">
                  TODO
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[25px] pl-[20px] border-l border-border-low-contrast w-[276px] flex-shrink-0">
            <Button variant="primary">Play now</Button>
            <Text variant="h3" className="text-content-primary">
              Facts
            </Text>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col">
                <Text variant="caption-s" className="text-content-secondary">
                  STATUS
                </Text>
                <Text variant="paragraph-m" className="text-content-primary">
                  {movieDetails.status}
                </Text>
              </div>
              {movieDetails.network && (
                <div className="flex flex-col">
                  <Text variant="caption-s" className="text-content-secondary">
                    NETWORK
                  </Text>
                  <Text variant="paragraph-m" className="text-content-primary">
                    {movieDetails.network}
                  </Text>
                </div>
              )}
              {movieDetails.type && (
                <div className="flex flex-col">
                  <Text variant="caption-s" className="text-content-secondary">
                    TYPE
                  </Text>
                  <Text variant="paragraph-m" className="text-content-primary">
                    {movieDetails.type}
                  </Text>
                </div>
              )}
              <div className="flex flex-col">
                <Text variant="caption-s" className="text-content-secondary">
                  ORIGINAL LANGUAGE
                </Text>
                <Text variant="paragraph-m" className="text-content-primary">
                  {movieDetails.originalLanguage}
                </Text>
              </div>
              <div className="flex flex-col gap-[5px]">
                <Text variant="caption-s" className="text-content-secondary">
                  KEYWORDS
                </Text>
                <Tags tags={movieDetails.keywords} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-[60px] py-[50px] gap-[10px] justify-center">
        <div className="flex flex-col gap-[30px] max-w-[1200px] min-w-[1080px]">
          <Text variant="h3" className="text-content-primary">
            Recommendations
          </Text>
          <ItemScroll initialData={movieDetails.recommendations} />
        </div>
      </div>
    </div>
  );
}
