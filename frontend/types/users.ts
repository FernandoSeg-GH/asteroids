import { ApiResponseWrapper, Asteroid } from "./asteroids";

export interface UserFavorite {
  id: string;
  email: string;
  username: string;
  favorites: ApiResponseWrapper["data"][];
}
