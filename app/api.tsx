const BASE = (process.env.EXPO_PUBLIC_API_BASE || "https://api.notigasm.com").replace(/\/+$/, "");

const TIMEOUT_MS = 10000; // 10 second timeout

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'No error details available');
    throw new Error(`${res.status} ${res.statusText}: ${errorText}`);
  }
  return res.json();
}

// Wrapper for fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response;
  } catch (error: unknown) {
    clearTimeout(timeout);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw new Error(`Network request failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred');
  }
}

export const api = {
  health: () => fetchWithTimeout(`${BASE}/health`).then(j),
  registerToken: (handle: string, token: string) =>
    fetchWithTimeout(`${BASE}/registerToken`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ handle, token }),
    }).then(j as any),
  startStorm: (p: {
    senderHandle: string;
    targetHandle: string;
    frequency: "LOW" | "MED" | "HIGH";
    minutes?: number;
    mode?: "csv" | "llm";
    count?: number;
    theme?: string | null;
  }) =>
    fetchWithTimeout(`${BASE}/storms/start`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(p),
    }).then(j as any),
  stopStorm: (stormId: number) =>
    fetchWithTimeout(`${BASE}/storms/stop`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ stormId }),
    }).then(j as any),
  listStorms: (handle: string) =>
    fetchWithTimeout(`${BASE}/storms?handle=${encodeURIComponent(handle)}`).then(j as any),
};

export default api;
