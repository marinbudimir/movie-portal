import { NextRequest, NextResponse } from 'next/server';
import { getTrending } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const timeWindow = searchParams.get('time_window') || 'day';

  try {
    const data = await getTrending(
      timeWindow as 'day' | 'week',
      parseInt(page)
    );
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trending data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending data' },
      { status: 500 }
    );
  }
} 