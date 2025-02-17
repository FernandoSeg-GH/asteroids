import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'username123', description: 'User username' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiProperty({ example: 'securepassword123', description: 'User password' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'securepassword123', description: 'User password' })
  password: string;
}

export class UserFavoriteDto {
  @ApiProperty({ example: 'asteroid456', description: 'Asteroid ID' })
  asteroidId: string;

  @ApiProperty({ example: 'Asteroid 123', description: 'Asteroid Name' })
  name: string;

  @ApiProperty({
    example: 'https://api.nasa.gov/asteroids/456',
    description: 'NASA API URL',
  })
  nasa_jpl_url: string;
}
