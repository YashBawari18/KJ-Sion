import { AnalysisResponse, ExplainResponse } from '@/types/analysis';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function checkBackendHealth(): Promise<{ healthy: boolean; message: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      return { healthy: true, message: data.service || 'Connected' };
    }
    return { healthy: false, message: `Server returned status ${res.status}` };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Connection failed';
    return { healthy: false, message: `Backend unavailable (${errorMsg}). Start it with ./start.sh` };
  }
}

export async function uploadAndAnalyze(file: File): Promise<AnalysisResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BACKEND_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    let errorDetail = 'Analysis failed. Please verify the image file.';
    try {
      const errorJson = await res.json();
      if (errorJson.detail) {
        errorDetail = errorJson.detail;
      }
    } catch {
      // response wasn't JSON
    }
    throw new Error(errorDetail);
  }

  return await res.json();
}

export async function requestExplanation(analysisData: AnalysisResponse, title?: string): Promise<ExplainResponse> {
  const res = await fetch(`${BACKEND_URL}/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      analysis_data: analysisData,
      title: title || ''
    })
  });

  if (!res.ok) {
    throw new Error('Failed to retrieve AI explanation.');
  }

  return await res.json();
}

export { BACKEND_URL };
