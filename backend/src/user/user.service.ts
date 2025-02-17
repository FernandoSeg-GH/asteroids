import { Injectable } from '@nestjs/common';
import { User } from './user.types';
import { Asteroid } from '../asteroids/asteroids.types';

@Injectable()
export class UserService {
  private user: User = {
    username: 'Fernando Segre',
    email: 'segre.fernando@gmail.com',
    favorites: [],
  };

  getUser(): User {
    return this.user;
  }

  getFavorites(): Asteroid[] {
    return this.user.favorites;
  }

  addFavorite(asteroid: Asteroid): User {
    const exists = this.user.favorites.find((fav) => fav.id === asteroid.id);
    if (!exists) {
      this.user.favorites.push(asteroid);
    }
    return this.user;
  }

  removeFavorite(asteroidId: string): User {
    this.user.favorites = this.user.favorites.filter(
      (fav) => fav.id !== asteroidId,
    );
    return this.user;
  }
}
