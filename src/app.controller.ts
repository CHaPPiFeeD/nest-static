import { Body, Controller, Post } from '@nestjs/common';
import { IAddKeyAppInterface } from './app.interface';
import { AppService } from './app.service';

@Controller('keys')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addKey(@Body() body: IAddKeyAppInterface): Promise<string> {
    return await this.appService.openChank(body.key);
  }
}
