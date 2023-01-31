import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import { readFileSync } from 'fs';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class ChankMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const openedChanksPath = path.resolve('src/json/opened-chanks.json');
    const openedChanks = JSON.parse(readFileSync(openedChanksPath, 'utf8'));
    const split = req.url.split('/').pop().split(/[-.]/);
    const row = split[1];
    const column = split[3];

    const isOpened = openedChanks.filter(
      (openedChank) => openedChank.row === row && openedChank.column === column,
    );

    if (isOpened.length) {
      next();
    } else {
      throw new HttpException('Fobbriden', 403);
    }
  }
}
