import { NextRequest, NextResponse } from 'next/server';
import { getPopularMovies, getPopularTV, getPopularPeople } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || 'movie';

  try {
    let data; 
    if(category === 'movie') {
      data = await getPopularMovies(
        parseInt(page)
      );
    } else if(category === 'tv') {
      data = await getPopularTV(
        parseInt(page)
      );
    } else if(category === 'person') {    
      data = await getPopularPeople(
        parseInt(page)
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching popular movies data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular movies data' },
      { status: 500 }
    );
  }
} 