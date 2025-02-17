import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.types';
import { Asteroid } from '../asteroids/asteroids.types';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get user details including favorites' })
  @ApiResponse({ status: 200, description: 'User details', type: Object })
  getUser(): User {
    return this.userService.getUser();
  }

  @Get('favorites')
  @ApiOperation({ summary: 'Get user favorite asteroids' })
  @ApiResponse({
    status: 200,
    description: 'List of favorite asteroids',
    type: [Object],
  })
  getFavorites(): Asteroid[] {
    return this.userService.getFavorites();
  }

  @Post('favorites')
  @ApiOperation({ summary: 'Add an asteroid to favorites' })
  @ApiResponse({
    status: 200,
    description: 'Updated user with favorites',
    type: Object,
  })
  addFavorite(@Body() asteroid: Asteroid): User {
    return this.userService.addFavorite(asteroid);
  }

  @Delete('favorites/:id')
  @ApiOperation({ summary: 'Remove an asteroid from favorites' })
  @ApiResponse({
    status: 200,
    description: 'Updated user with favorites',
    type: Object,
  })
  removeFavorite(@Param('id') id: string): User {
    return this.userService.removeFavorite(id);
  }
}
