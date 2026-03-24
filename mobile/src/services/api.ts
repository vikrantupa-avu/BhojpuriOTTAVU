const BASE_URL = 'https://api.example.com/api';

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  getHome: () => request('/series/home'),
  getSeries: () => request('/series'),
  getSeriesById: (id: string) => request(`/series/${id}`),
  getEpisodes: (seriesId: string) => request(`/episodes/${seriesId}`),
  search: (q: string) => request(`/search?q=${encodeURIComponent(q)}`),
  getContinueWatching: (userId: string) => request(`/continue-watching?userId=${userId}`),
  saveProgress: (payload: Record<string, unknown>) =>
    fetch(`${BASE_URL}/watch-progress`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    }),
};
