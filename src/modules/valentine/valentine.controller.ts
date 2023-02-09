import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ValentineService } from './services/valentine.service';
import {
  IAddKeyValentineInterface,
  IGetOpenedChankInterface,
  IOpenedChankRestonseInterface,
} from './interfaces/valentine.interface';
import { OpenedChankObj } from './types';

@Controller('api/valentine')
export class ValentineController {
  constructor(private valentineService: ValentineService) {}

  @Post()
  async openChank(
    @Body() body: IAddKeyValentineInterface,
  ): Promise<OpenedChankObj> {
    return await this.valentineService.openChank(body);
  }

  @Get()
  async getOpenedChanks(
    @Query() params: IGetOpenedChankInterface,
  ): Promise<IOpenedChankRestonseInterface> {
    return await this.valentineService.getOpenedChanks(params.puzzle);
  }
}
