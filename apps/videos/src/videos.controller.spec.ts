import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

describe('VideosController', () => {
  let videosController: VideosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [VideosService],
    }).compile();

    videosController = app.get<VideosController>(VideosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(videosController.getHello()).toBe('Hello World!');
    });
  });
});
