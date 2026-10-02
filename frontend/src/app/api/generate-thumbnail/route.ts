import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30; // 30s timeout

const STYLE_PROMPTS: Record<string, string> = {
  mrbeast: 'MrBeast YouTube thumbnail style, hyper-expressive shocked face, intense saturated vibrant colors, high contrast, huge scale, clean background separation, cinematic lighting, 8k resolution',
  gaming: 'Epic video game action thumbnail, neon RGB rim lighting, dynamic esports perspective, cinematic gaming atmosphere, sharp details, glowing highlights, 8k',
  tech: 'Modern tech review thumbnail, sleek dark aesthetics, futuristic holographic HUD accents, glowing blue and violet lights, premium gadget centerpiece, 8k',
  finance: 'Wealth and finance YouTube thumbnail, glowing gold coins, green profit chart exploding upwards, luxury aesthetic, dark dramatic studio lighting, 8k',
  vlog: 'Lifestyle YouTube thumbnail, cheerful expressive vlogger, beautiful scenic bokeh background, golden hour natural sunlight, high saturation, sharp crisp focus',
  podcast: 'High-end podcast studio, Shure SM7B microphone in foreground, moody dark acoustic panels, warm orange and cyan neon ambient backlighting, cinematic depth of field',
  mystery: 'Dark mystery documentary YouTube thumbnail, dramatic moody fog, investigative silhouette, glowing red accent light, cinematic crime thriller atmosphere',
  none: '',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { prompt, style = 'none', seed = Math.floor(Math.random() * 1000000) } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const trimmedPrompt = prompt.trim();
    const styleModifier = STYLE_PROMPTS[style] || '';
    
    // Construct enhanced thumbnail prompt
    const promptParts = [
      trimmedPrompt,
      styleModifier,
      'YouTube thumbnail style, 16:9 widescreen composition, high visual impact, vivid eye-catching colors, professional production quality, 8k resolution, no watermark'
    ].filter(Boolean);

    const enhancedPrompt = promptParts.join(', ');
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&model=flux&seed=${seed}&nologo=true`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 26000);

    const res = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'ThumbnailIQ-AI-Generator/1.0',
      },
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json(
        { error: `AI generation service returned status ${res.status}` },
        { status: 502 }
      );
    }

    const buffer = await res.arrayBuffer();
    if (buffer.byteLength < 5000) {
      return NextResponse.json(
        { error: 'Generated image was empty or invalid' },
        { status: 502 }
      );
    }

    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({
      success: true,
      imageUrl: dataUrl,
      prompt: trimmedPrompt,
      enhancedPrompt,
      style,
      seed,
    });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'AI generation timed out. Please try again with a shorter prompt.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: error?.message || 'Failed to generate thumbnail image' },
      { status: 500 }
    );
  }
}
