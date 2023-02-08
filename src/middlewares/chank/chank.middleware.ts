import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@nestjs/common/exceptions';
import { IPuzzleJson } from 'src/modules/valentine/interfaces/puzzle-json.interfase';

@Injectable()
export class ChankMiddleware implements NestMiddleware {
  @Inject('PuzzleJson')
  private puzzleJson: IPuzzleJson;

  async use(req: Request, res: Response, next: NextFunction) {
    const puzzle = req.url.split('/')[2];
    if (!puzzle) throw new HttpException('Not found', 404);

    const openedChanks = await this.puzzleJson.readOpenedChanks(puzzle);
    const splitedFilename = req.url.split('/').pop().split(/[-.]/);
    const row = splitedFilename[1];
    const column = splitedFilename[3];

    const isOpened = openedChanks.filter(
      (c) => +c.row === +row && +c.column === +column,
    );

    if (isOpened.length) {
      next();
    } else {
      throw new HttpException('Fobbriden', 403);
    }
  }
}
