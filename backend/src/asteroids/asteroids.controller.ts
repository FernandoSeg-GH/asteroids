import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AsteroidsService } from './asteroids.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Asteroid, AsteroidsApiResponse } from './asteroids.types';

interface ApiResponseWrapper<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

@ApiTags('Asteroids')
@Controller('asteroids')
export class AsteroidsController {
  constructor(private readonly asteroidsService: AsteroidsService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of asteroids by date range' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of asteroids.',
    type: Object,
  })
  @ApiQuery({
    name: 'start_date',
    description: 'Format: YYYY-MM-DD (max-range: 7 days).',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'end_date',
    description: 'Format: YYYY-MM-DD (max-range: 7 days).',
    required: true,
    type: String,
  })
  async getAsteroids(
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ): Promise<ApiResponseWrapper<AsteroidsApiResponse>> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays > 7) {
      return {
        success: false,
        data: null,
        error: 'Date range cannot exceed 7 days.',
      };
    }

    try {
      const asteroids = await this.asteroidsService.fetchAsteroids(
        startDate,
        endDate,
      );

      if (!asteroids) {
        console.error('Backend API returned unexpected data:', asteroids);
        throw new HttpException(
          'Invalid response structure from NASA API',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return { success: true, data: asteroids, error: null };
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data || error.message || 'Internal Server Error',
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get asteroid details by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns asteroid details from asteroid id.',
    type: Object,
  })
  @ApiResponse({ status: 404, description: 'Asteroid not found' })
  async getAsteroidById(
    @Param('id') id: string,
  ): Promise<ApiResponseWrapper<Asteroid>> {
    try {
      const asteroid = await this.asteroidsService.fetchAsteroidById(id);
      if (!asteroid) {
        return {
          success: false,
          data: null,
          error: `Asteroid with id ${id} not found`,
        };
      }
      return { success: true, data: asteroid, error: null };
    } catch (error) {
      console.error(`Error fetching asteroid by id ${id}:`, error);
      return {
        success: false,
        data: null,
        error: error.response?.data || error.message || 'Internal Server Error',
      };
    }
  }
}
