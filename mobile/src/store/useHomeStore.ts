import { create } from 'zustand';
import { api } from '../services/api';
import { Series } from '../types/content';

interface HomeState {
  featured: Series[];
  trending: Series[];
  newReleases: Series[];
  continueWatching: Series[];
  loading: boolean;
  loadHome: (userId: string) => Promise<void>;
}

export const useHomeStore = create<HomeState>((set) => ({
  featured: [],
  trending: [],
  newReleases: [],
  continueWatching: [],
  loading: false,
  loadHome: async (userId: string) => {
    set({ loading: true });
    const [home, continueWatching] = await Promise.all([api.getHome(), api.getContinueWatching(userId)]);
    set({
      loading: false,
      featured: home.featured,
      trending: home.trending,
      newReleases: home.newReleases,
      continueWatching,
    });
  },
}));
