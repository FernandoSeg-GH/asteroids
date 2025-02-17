import { Asteroid } from "./asteroids";

export interface UserFavorite {
  username: string;
  email: string;
  favorites: Asteroid[];
}
