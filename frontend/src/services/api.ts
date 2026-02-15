const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function toJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function health() {
  const res = await fetch(`${API_BASE}/health`);
  return toJson<{ status: string; timestamp: string }>(res);
}
