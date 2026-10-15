export interface Album {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  releaseDate: string;
  primaryGenreName: string;
}

export interface Track {
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  previewUrl?: string;
}

export interface ItunesResponse<T> {
  resultCount: number;
  results: T[];
}
