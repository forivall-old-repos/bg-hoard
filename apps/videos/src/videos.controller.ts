import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getHello(): string {
    return this.videosService.getHello();
  }
}
