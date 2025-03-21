import axios from "axios";

import { extractYear, formatDate } from "@/utils/date";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export type MediaType = "movie" | "tv" | "person";

export interface TMDBItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  [key: string]: any;
}

export interface TMDBResponseData {
  page: number;
  results: TMDBItem[];
  total_pages: number;
  total_results: number;
}

export interface TransformedItem {
  id: number;
  title: string;
  cover: string;
  ranking?: string;
  releaseDate?: string;
  role?: string;
  mediaType: MediaType;
}

export interface TransformedDetailsItem extends TransformedItem {
  releaseYear: string;
  overview: string;
  genres: Array<{ id: number; name: string }>;
  cast: TransformedItem[];
  status: string;
  recommendations: TransformedItem[];
  network?: string;
  type?: string;
  originalLanguage: string;
  keywords: string[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GroupedSearchResults {
  movie: TransformedItem[];
  tv: TransformedItem[];
  person: TransformedItem[];
  page: number;
  total_pages: number;
  total_results: number;
}

const transformItem = (item: TMDBItem): TransformedItem => ({
  id: item.id,
  title: item.title || item.name || "",
  cover: item.poster_path || item.profile_path || "",
  ranking: item.vote_average ? `${Math.round(item.vote_average * 10)}%` : "",
  releaseDate: formatDate(
    new Date(item.release_date || item.first_air_date || "")
  ),
  mediaType: (item.media_type || "movie") as MediaType,
});

const transformResponse = <T>(
  response: { data: TMDBResponseData },
  transformFn: (item: TMDBItem) => T
): PaginatedResponse<T> => ({
  page: response.data.page,
  results: response.data.results.map(transformFn),
  total_pages: response.data.total_pages,
  total_results: response.data.total_results,
});

const fetchPaginated = async <T>(
  endpoint: string,
  transformFn: (item: TMDBItem) => T,
  page: number = 1,
  additionalParams: Record<string, any> = {}
): Promise<PaginatedResponse<T>> => {
  const response = await tmdb.get(endpoint, {
    params: { page, ...additionalParams },
  });
  return transformResponse(response, transformFn);
};

export const getTrending = async (
  timeWindow: "day" | "week" = "day",
  page: number = 1
): Promise<PaginatedResponse<TransformedItem>> => {
  return fetchPaginated(
    `/trending/all/${timeWindow}`,
    (item) => transformItem(item),
    page
  );
};

export const getUpcomingMovies = async (
  page: number = 1
): Promise<PaginatedResponse<TransformedItem>> => {
  return fetchPaginated(`/movie/upcoming`, (item) => transformItem(item), page);
};

export const getPopularMovies = async (
  page: number = 1
): Promise<PaginatedResponse<TransformedItem>> => {
  return fetchPaginated(`/movie/popular`, (item) => transformItem(item), page);
};

export const getPopularTV = async (
  page: number = 1
): Promise<PaginatedResponse<TransformedItem>> => {
  return fetchPaginated(`/tv/popular`, (item) => transformItem(item), page);
};

export const getPopularPeople = async (
  page: number = 1
): Promise<PaginatedResponse<TransformedItem>> => {
  return fetchPaginated(`/person/popular`, (item) => transformItem(item), page);
};

export const searchMulti = async (
  query: string,
  page: number = 1
): Promise<GroupedSearchResults> => {
  const response = await tmdb.get("/search/multi", {
    params: { query, page },
  });

  const results = response.data.results.map((item: TMDBItem) => {
    const mediaType = (item.media_type || "movie") as MediaType;
    return {
      ...transformItem(item),
      mediaType,
    };
  });

  const grouped: GroupedSearchResults = {
    movie: [],
    tv: [],
    person: [],
    page: response.data.page,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };

  results.forEach((item: TransformedItem) => {
    if (item.mediaType === "movie") {
      grouped.movie.push(item);
    } else if (item.mediaType === "tv") {
      grouped.tv.push(item);
    } else if (item.mediaType === "person") {
      grouped.person.push(item);
    }
  });

  return grouped;
};

export const getMovieDetails = async (
  id: string,
  type: string
): Promise<TransformedDetailsItem> => {
  const keywordsParam = type === "movie" ? "keywords" : "results";
  const response = await tmdb.get(`/${type}/${id}`);

  const creditsResponse = await tmdb.get(`/${type}/${id}/credits`);
  const transformedCastResults = creditsResponse.data.cast.map(
    (item: any): TransformedItem => ({
      id: item.id,
      title: item.name,
      cover: item.profile_path,
      role: item.character,
      mediaType: "person",
    })
  );

  const recommendationsResponse = await tmdb.get(
    `/${type}/${id}/recommendations`
  );
  const transformedRecommendationsResults =
    recommendationsResponse.data.results.map(
      (item: TMDBItem): TransformedItem => transformItem(item)
    );

  const keywordsResponse = await tmdb.get(`/${type}/${id}/keywords`);
  const keywords =
    keywordsResponse.data[keywordsParam]?.map((item: TMDBItem) => item.name) ||
    [];

  const data = response.data;
  const transformedResults: TransformedDetailsItem = {
    id: data.id,
    title: data.title || data.name,
    cover: data.poster_path,
    ranking: `${Math.round(data.vote_average * 10)}%`,
    releaseDate: formatDate(new Date(data.release_date || data.first_air_date)),
    releaseYear: extractYear(data.release_date || data.first_air_date),
    mediaType: type as MediaType,
    overview: data.overview,
    genres: data.genres,
    cast: transformedCastResults,
    status: data.status,
    recommendations: transformedRecommendationsResults,
    network: data.networks?.[0]?.name,
    type: data.type,
    originalLanguage: data.original_language,
    keywords: keywords,
  };

  return transformedResults;
};

export const getPersonDetails = async (id: string): Promise<any> => {
  const response = await tmdb.get(`/person/${id}`);
  return response.data;
};

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "/na.jpg";
  return `${IMAGE_BASE_URL}${path}`;
};
