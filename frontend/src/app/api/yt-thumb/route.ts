import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy YouTube thumbnails server-side to bypass CORS/hotlink restrictions.
 * Usage: /api/yt-thumb?v=VIDEO_ID
 * Tries: maxresdefault → hqdefault → mqdefault → default
 */
export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get('v');
  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    return new NextResponse('Invalid video ID', { status: 400 });
  }

  const qualities = ['hqdefault', 'mqdefault', 'default'];

  for (const quality of qualities) {
    const url = `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ThumbnailIQ/1.0)',
          'Referer': 'https://www.youtube.com/',
        },
        cache: 'force-cache',
      });

      if (!res.ok) continue;

      const buffer = await res.arrayBuffer();
      // YouTube returns a tiny 120×90 grey placeholder for missing thumbnails (~1.3 KB)
      // Real thumbnails are always larger than 5 KB
      if (buffer.byteLength < 5000) continue;

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch {
      continue;
    }
  }

  // All qualities failed — return a 302 to a placeholder gradient SVG
  return NextResponse.redirect(
    new URL(`/api/yt-thumb/placeholder?v=${videoId}`, request.url)
  );
}
