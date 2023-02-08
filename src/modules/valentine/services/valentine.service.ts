import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IPuzzleJson } from '../interfaces/puzzle-json.interfase';
import {
  IAddKeyValentineInterface,
  IOpenedChankRestonseInterface,
} from '../interfaces/valentine.interface';

@Injectable()
export class ValentineService {
  @Inject('PuzzleJson')
  private puzzleJson: IPuzzleJson;

  async openChank({ key, puzzle }: IAddKeyValentineInterface): Promise<string> {
    const keys = await this.puzzleJson.readKeys(puzzle);
    const openedChanks = await this.puzzleJson.readOpenedChanks(puzzle);

    const sameKey = keys.filter(({ userKey }) => userKey === key).shift();
    if (!sameKey) throw new HttpException('Invalid key', 400);

    const { row, column } = sameKey;

    openedChanks.forEach((openedChank) => {
      if (openedChank.row === row && openedChank.column == column)
        throw new HttpException('The key is already in use', 400);
    });

    openedChanks.push({ row, column });
    this.puzzleJson.writeOpenedChanks(puzzle, openedChanks);

    return 'saved';
  }

  async getOpenedChanks(
    puzzle: string,
  ): Promise<IOpenedChankRestonseInterface> {
    const openedChanks = await this.puzzleJson.readOpenedChanks(puzzle);
    const keys = await this.puzzleJson.readKeys(puzzle);

    if (keys.length === openedChanks.length) {
      const { moneySum } = await this.puzzleJson.readMoneySum(puzzle);

      return {
        isOpened: true,
        fullImageUrl: `/puzzle/${puzzle}/full-image.png`,
        openedChanks,
        moneySum,
      };
    } else {
      return {
        isOpened: false,
        openedChanks,
      };
    }
  }
}
