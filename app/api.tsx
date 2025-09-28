const BASE = process.env.EXPO_PUBLIC_API_BASE!.replace(/\/+$/, "");

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  health: () => fetch(`${BASE}/health`).then(j),
  registerToken: (handle: string, token: string) =>
    fetch(`${BASE}/registerToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    fetch(`${BASE}/storms/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    }).then(j as any),
  stopStorm: (stormId: number) =>
    fetch(`${BASE}/storms/stop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stormId }),
    }).then(j as any),
  listStorms: (handle: string) =>
    fetch(`${BASE}/storms?handle=${encodeURIComponent(handle)}`).then(j as any),
};

export default api;
