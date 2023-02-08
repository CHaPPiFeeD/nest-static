/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const generateKey = (length) => {
  let key = '';

  for (let i = 0; i < length; i++) {
    key += Math.ceil(Math.random() * 9);
  }

  return +key;
};

const assetDirPath = path.resolve('src/assets/9x9');
const keysPath = path.resolve('src/json/keys.json');
const openedChanksPath = path.resolve('src/json/opened-chanks.json');

fs.readdir(assetDirPath, (err, files) => {
  const keys = [];

  for (let i = 0; i < files.length; i++) {
    const split = files[i].split(/[-.]/);
    const row = split[1];
    const column = split[3];
    const userKey = generateKey(10).toString(16);

    keys.push({ row, column, userKey });
  }

  fs.writeFileSync(keysPath, JSON.stringify(keys));
  fs.writeFileSync(openedChanksPath, '[]');
});
