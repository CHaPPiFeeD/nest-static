import { HttpException, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  async openChank(key: string): Promise<string> {
    const keysPath = path.resolve('src/json/keys.json');
    const keys = JSON.parse(readFileSync(keysPath, 'utf8'));

    const openedChanksPath = path.resolve('src/json/opened-chanks.json');
    const openedChanks = JSON.parse(readFileSync(openedChanksPath, 'utf8'));

    const id = +key.slice(0, 3);

    const sameKeys = keys.filter(({ userKey }) => userKey === key).length;
    if (!sameKeys) throw new HttpException('Invalid key', 400);

    openedChanks.forEach((openedId) => {
      if (openedId === id)
        throw new HttpException('The key is already in use', 400);
    });

    openedChanks.push(id);
    writeFileSync(openedChanksPath, JSON.stringify(openedChanks));

    return 'saved';
  }

  async getChanks(): Promise<string[]> {
    const assetDirPath = path.resolve('src/assets/10x10');

    return readdirSync(assetDirPath);
  }
}
