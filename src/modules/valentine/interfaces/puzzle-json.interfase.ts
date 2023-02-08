import { ChankObj, OpenedChankObj } from '../types';

export interface IPuzzleJson {
  readKeys(puzzle: string): ChankObj[] | Promise<ChankObj[]>;

  readOpenedChanks(
    puzzle: string,
  ): OpenedChankObj[] | Promise<OpenedChankObj[]>;

  writeOpenedChanks(puzzle: string, data: any[]): void;

  readMoneySum(puzzle: string): Promise<{ moneySum: number }>;
}
