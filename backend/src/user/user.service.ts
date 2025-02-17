import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.types';
import * as argon2 from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import axios from 'axios';
import { Asteroid } from 'src/asteroids/asteroids.types';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    if (!password) {
      throw new Error('  Password is required!');
    }

    try {
      const hashedPassword = await argon2.hash(password);

      const user = await this.prisma.user.create({
        data: { email, username, password: hashedPassword },
      });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(`  Registration failed: ${error.message}`);
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }

  async getUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getFavorites(userId: string): Promise<{ asteroidId: string }[]> {
    try {
      const favorites = await this.prisma.favorite.findMany({
        where: { userId },
        select: { asteroidId: true },
      });

      return favorites;
    } catch (error) {
      console.error('Database query error in getFavorites:', error);
      throw new Error('Database error: Failed to fetch favorites.');
    }
  }

  async addFavorite(
    userId: string,
    asteroidData: { asteroidId: string },
  ): Promise<User> {
    if (
      !asteroidData?.asteroidId ||
      typeof asteroidData.asteroidId !== 'string'
    ) {
      console.error('Invalid asteroidId received:', asteroidData);
      throw new Error('Invalid asteroid ID format');
    }

    try {
      const existingFavorite = await this.prisma.favorite.findUnique({
        where: {
          userId_asteroidId: {
            userId,
            asteroidId: asteroidData.asteroidId,
          },
        },
      });

      if (existingFavorite) {
        console.warn('Favorite already exists.');
        return this.getUser(userId);
      }

      await this.prisma.favorite.create({
        data: {
          asteroidId: asteroidData.asteroidId,
          userId,
        },
      });

      return this.getUser(userId);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw new Error('Database error: Failed to add favorite.');
    }
  }

  async removeFavorite(
    userId: string,
    asteroidId: string,
  ): Promise<{ favorites: { asteroidId: string }[] }> {
    try {
      await this.prisma.favorite.deleteMany({
        where: { userId, asteroidId },
      });

      const updatedFavorites = await this.getFavorites(userId);
      return { favorites: updatedFavorites };
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw new Error('Error removing favorite asteroid');
    }
  }
}
