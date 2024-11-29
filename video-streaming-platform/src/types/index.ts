export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  views: number;
  likes: number;
  uploadDate: string;
  category: string;
  uploader: string;
  genre_ids: number[]
}

export interface IGenre {
  id: number;
  name: string;
}