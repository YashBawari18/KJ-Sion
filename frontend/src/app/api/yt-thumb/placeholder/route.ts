import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const v = request.nextUrl.searchParams.get('v') ?? '';
  // Generate a unique color per video ID from its first chars
  const hue = (v.charCodeAt(0) * 37 + v.charCodeAt(1) * 17) % 360 || 250;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue},60%,25%)" />
      <stop offset="100%" style="stop-color:hsl(${(hue + 60) % 360},50%,15%)" />
    </linearGradient>
  </defs>
  <rect width="480" height="360" fill="url(#g)" rx="4"/>
  <circle cx="240" cy="180" r="40" fill="rgba(255,255,255,0.15)" />
  <polygon points="228,160 228,200 268,180" fill="rgba(255,255,255,0.8)" />
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
