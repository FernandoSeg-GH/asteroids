import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsteroidsModule } from './asteroids/asteroids.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AsteroidsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
  exports: [PrismaService],
})
export class AppModule {}
