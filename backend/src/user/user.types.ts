import { Asteroid } from '../asteroids/asteroids.types';

export interface User {
  username: string;
  email: string;
  favorites: Asteroid[];
}
