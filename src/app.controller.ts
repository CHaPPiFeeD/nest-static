import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/assets')
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('assets')
  // getStaticFile(): StreamableFile {
  //   const file = createReadStream(
  //     join(__dirname, '..', 'src', 'assets', '3x3', 'image_part_001.jpg'),
  //   );
  //   return new StreamableFile(file);
  // }
}
