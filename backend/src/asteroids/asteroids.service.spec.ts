import { Test, TestingModule } from '@nestjs/testing';
import { AsteroidsService } from './asteroids.service';

describe('AsteroidsService', () => {
  let service: AsteroidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsteroidsService],
    }).compile();

    service = module.get<AsteroidsService>(AsteroidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
