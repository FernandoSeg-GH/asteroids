import { Module } from '@nestjs/common';
import { AsteroidsController } from './asteroids.controller';
import { AsteroidsService } from './asteroids.service';

@Module({
  controllers: [AsteroidsController],
  providers: [AsteroidsService],
})
export class AsteroidsModule {}
