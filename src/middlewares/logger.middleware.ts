import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import { readFileSync } from 'fs';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const openedChanksPath = path.resolve('src/json/opened-chanks.json');
    const openedChanks = JSON.parse(readFileSync(openedChanksPath, 'utf8'));
    const chankId = +req.url.split('/').pop().substring(11, 14);
    const isOpened = openedChanks.filter((openedId) => openedId === chankId);

    if (isOpened.length) {
      next();
    } else {
      throw new HttpException('Fobbriden', 403);
    }
  }
}
