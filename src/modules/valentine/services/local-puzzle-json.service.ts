import { HttpException, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { IPuzzleJson } from '../interfaces/puzzle-json.interfase';
import * as path from 'path';

@Injectable()
export class LocalPuzzleJson implements IPuzzleJson {
  private puzzles = [];

  constructor() {
    const jsonFolderPath = path.resolve('src/modules/valentine/json');
    if (existsSync(jsonFolderPath)) {
      const puzzles = readdirSync(jsonFolderPath);
      this.puzzles = puzzles;
    }
  }

  readKeys(puzzle: string): any[] {
    if (!this.puzzles.includes(puzzle))
      throw new HttpException('Puzzle not found', 404);

    const keysPath = path.resolve(
      `src/modules/valentine/json/${puzzle}/keys.json`,
    );

    return JSON.parse(readFileSync(keysPath, 'utf8'));
  }

  readOpenedChanks(puzzle: string): any[] {
    if (!this.puzzles.includes(puzzle))
      throw new HttpException('Puzzle not found', 404);

    const openedChanksPath = path.resolve(
      `src/modules/valentine/json/${puzzle}/opened-chanks.json`,
    );

    return JSON.parse(readFileSync(openedChanksPath, 'utf8'));
  }

  writeOpenedChanks(puzzle: string, data: any[]): void {
    if (!this.puzzles.includes(puzzle))
      throw new HttpException('Puzzle not found', 404);

    const openedChanksPath = path.resolve(
      `src/modules/valentine/json/${puzzle}/opened-chanks.json`,
    );

    writeFileSync(openedChanksPath, JSON.stringify(data));
  }

  async readMoneySum(puzzle: string): Promise<{ moneySum: number }> {
    if (!this.puzzles.includes(puzzle))
      throw new HttpException('Puzzle not found', 404);

    const moneySumPath = path.resolve(
      `src/modules/valentine/json/${puzzle}/money-sum.json`,
    );

    return await JSON.parse(readFileSync(moneySumPath, 'utf8'));
  }
}
