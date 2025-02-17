import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.types';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto, LoginUserDto, UserFavoriteDto } from './user.dto';

interface ApiResponseWrapper<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(
    @Body() body: RegisterUserDto,
  ): Promise<ApiResponseWrapper<User>> {
    try {
      const user = await this.userService.register(
        body.email,
        body.username,
        body.password,
      );
      return { success: true, data: user, error: null };
    } catch (error) {
      throw new HttpException(
        error.response || '  Registration failed.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() body: LoginUserDto,
  ): Promise<ApiResponseWrapper<{ user: User; token: string }>> {
    try {
      const result = await this.userService.login(body.email, body.password);
      return { success: true, data: result, error: null };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, data: null, error: 'Invalid credentials' };
    }
  }

  @Get('favorites')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Get user's favorite asteroid IDs" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "User's favorite asteroid IDs" })
  async getFavorites(
    @Req() req: any,
  ): Promise<ApiResponseWrapper<{ asteroidId: string }[]>> {
    try {
      if (!req.user || !req.user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const favorites = await this.userService.getFavorites(req.user.id);

      return { success: true, data: favorites, error: null };
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return { success: false, data: null, error: 'Internal Server Error' };
    }
  }

  @Post('favorites')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Add an asteroid to favorites' })
  @ApiBearerAuth()
  @ApiBody({ type: UserFavoriteDto })
  @ApiResponse({ status: 201, description: 'Asteroid added to favorites' })
  async addFavorite(
    @Req() req: any,
    @Body() { asteroidId }: UserFavoriteDto,
  ): Promise<ApiResponseWrapper<User>> {
    try {
      if (!req.user || !req.user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      if (!asteroidId || typeof asteroidId !== 'string') {
        console.error('Invalid asteroidId received:', asteroidId);
        throw new HttpException(
          'Invalid asteroid ID format',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userService.addFavorite(req.user.id, {
        asteroidId,
      });
      return { success: true, data: user, error: null };
    } catch (error) {
      console.error('Error adding favorite:', error);
      return { success: false, data: null, error: 'Internal Server Error' };
    }
  }

  @Delete('favorites/:asteroidId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Remove an asteroid from favorites' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Asteroid removed from favorites' })
  async removeFavorite(
    @Req() req: any,
    @Param('asteroidId') asteroidId: string,
  ): Promise<ApiResponseWrapper<{ asteroidId: string }[]>> {
    try {
      if (!req.user || !req.user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const updatedFavorites = await this.userService.removeFavorite(
        req.user.id,
        asteroidId,
      );
      return { success: true, data: updatedFavorites.favorites, error: null };
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw new HttpException(
        'Failed to remove favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
