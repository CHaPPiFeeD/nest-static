import { Body, Controller, Get, Post } from '@nestjs/common';
import { IAddKeyAppInterface } from './app.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('keys')
  async addKey(@Body() body: IAddKeyAppInterface): Promise<string> {
    return await this.appService.openChank(body.key);
  }

  @Get('chanks')
  async getChanks(): Promise<any> {
    return await this.appService.getChanks();
  }

  @Get('test')
  async getOpenedChanksKeys() {
    return await this.appService.getOpenedChanksKeys();
  }
}
