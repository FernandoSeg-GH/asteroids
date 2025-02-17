import { ApiResponseWrapper, Asteroid, AsteroidsData } from "./asteroids";

export interface UserFavorite {
  id: string;
  email: string;
  username: string;
  favorites: ApiResponseWrapper<AsteroidsData>["data"][];
}
