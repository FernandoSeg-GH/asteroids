import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { Asteroid, AsteroidsApiResponse } from './asteroids.types';

@Injectable()
export class AsteroidsService {
  private readonly NASA_API_URL = process.env.NASA_API_URL;
  private readonly API_KEY = process.env.API_KEY;

  async fetchAsteroids(
    startDate: string,
    endDate: string,
  ): Promise<AsteroidsApiResponse> {
    try {
      const url = `${this.NASA_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${this.API_KEY}`;
      const response = await axios.get<AsteroidsApiResponse>(url);

      return response.data;
    } catch (error) {
      console.error('NASA API Error:', error.response?.data || error.message);
      throw new HttpException(
        'Error fetching asteroid data',
        error.response?.status || 500,
      );
    }
  }

  async fetchAsteroidById(id: string): Promise<Asteroid> {
    try {
      const url = `${this.NASA_API_URL.replace('/feed', '/neo')}/${id}?api_key=${this.API_KEY}`;
      const response = await axios.get<Asteroid>(url);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('NASA API Error:', error.response?.data || error.message);
      throw new HttpException(
        'Error fetching asteroid data by ID',
        error.response?.status || 500,
      );
    }
  }
}
