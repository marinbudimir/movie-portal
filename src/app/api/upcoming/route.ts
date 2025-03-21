import { NextRequest, NextResponse } from "next/server";
import { getUpcomingMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";

  try {
    const data = await getUpcomingMovies(parseInt(page));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching upcoming movies data:", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming movies data" },
      { status: 500 }
    );
  }
}
