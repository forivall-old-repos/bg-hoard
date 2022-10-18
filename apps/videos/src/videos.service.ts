import { Injectable } from '@nestjs/common';

@Injectable()
export class VideosService {
  getHello(): string {
    return 'Hello World!';
  }
}
