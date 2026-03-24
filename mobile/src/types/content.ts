export interface Series {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  heroBannerUrl: string;
  tags: string[];
  categories: string[];
}

export interface Episode {
  _id: string;
  seriesId: string;
  title: string;
  episodeNumber: number;
  durationSeconds: number;
  hlsManifestUrl: string;
  introEndSecond: number;
}
