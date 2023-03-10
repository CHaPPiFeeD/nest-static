import { HttpException, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  async openChank(key: string): Promise<string> {
    console.log(key, 'key');
    const keysPath = path.resolve('src/json/keys.json');
    const keys = JSON.parse(readFileSync(keysPath, 'utf8'));

    const openedChanksPath = path.resolve('src/json/opened-chanks.json');
    const openedChanks = JSON.parse(readFileSync(openedChanksPath, 'utf8'));

    const sameKey = keys.filter(({ userKey }) => userKey === key).shift();
    if (!sameKey) throw new HttpException('Invalid key', 400);

    const { row, column } = sameKey;

    openedChanks.forEach((openedChank) => {
      if (openedChank.row === row && openedChank.column == column)
        throw new HttpException('The key is already in use', 400);
    });

    openedChanks.push({ row, column });
    writeFileSync(openedChanksPath, JSON.stringify(openedChanks));

    return 'saved';
  }

  async getChanks(): Promise<string[]> {
    const assetDirPath = path.resolve('src/assets/9x9');

    return readdirSync(assetDirPath);
  }

  async getOpenedChanksKeys(): Promise<string[]> {
    const keysPath = path.resolve('src/json/opened-chanks.json');
    const keys = JSON.parse(readFileSync(keysPath, 'utf8'));

    return keys;
  }
}
