import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { AsteroidsApiResponse } from './asteroids.types';

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
      console.log(`Fetching NASA API: ${url}`);

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
}
