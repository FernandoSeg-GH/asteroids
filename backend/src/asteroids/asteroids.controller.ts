import { Controller, Get, Query, Param } from '@nestjs/common';
import { AsteroidsService } from './asteroids.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AsteroidsApiResponse } from './asteroids.types';

@ApiTags('Asteroids')
@Controller('asteroids')
export class AsteroidsController {
  constructor(private readonly asteroidsService: AsteroidsService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of asteroids by date range' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of asteroids with details',
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
  ): Promise<AsteroidsApiResponse> {
    const asteroids = await this.asteroidsService.fetchAsteroids(
      startDate,
      endDate,
    );

    // const firstDate = Object.keys(asteroids.near_earth_objects)[0];
    // const firstAsteroid = asteroids.near_earth_objects[firstDate][0];
    // console.log(firstAsteroid);

    return asteroids;
  }
}
