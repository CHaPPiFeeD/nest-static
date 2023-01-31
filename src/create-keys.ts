/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const generateKey = (length) => {
  let key = '';

  for (let i = 0; i < length; i++) {
    key += Math.ceil(Math.random() * 9);
  }

  return key;
};

const zeroPad = (num, count) => {
  let numZeropad = num + '';

  while (numZeropad.length < count) {
    numZeropad = '0' + numZeropad;
  }
  return numZeropad;
};

const assetDirPath = path.resolve('src/assets/3x3');
const keysPath = path.resolve('src/json/keys.json');
const openedChanksPath = path.resolve('src/json/opened-chanks.json');

fs.readdir(assetDirPath, (err, files) => {
  const keys = [];

  for (let i = 0; i < files.length; i++) {
    const id = i + 1;
    const key = +generateKey(10);
    const userKey = key.toString(16);

    keys.push({ id, userKey });
  }

  fs.writeFileSync(keysPath, JSON.stringify(keys));
  fs.writeFileSync(openedChanksPath, '[]');
});
