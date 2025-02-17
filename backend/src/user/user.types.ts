import { Asteroid } from '../asteroids/asteroids.types';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  favorites?: Asteroid[];
  createdAt: Date;
  updatedAt: Date;
}
