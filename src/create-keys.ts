/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const generateKey = (length) => {
  let key = '';

  for (let i = 0; i < length; i++) {
    key += Math.floor(Math.random() * 9);
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

const assetDirPath = path.resolve('src/assets/10x10');
const keysPath = path.resolve('src/json/keys.json');
const openedChanksPath = path.resolve('src/json/opened-chanks.json');

fs.readdir(assetDirPath, (err, files) => {
  const keys = [];

  for (let i = 0; i < files.length; i++) {
    const id = i + 1;
    const key = generateKey(7);
    const paddingId = zeroPad(id, 3);

    keys.push({ id, key, userKey: paddingId + key });
  }

  fs.writeFileSync(keysPath, JSON.stringify(keys));
  fs.writeFileSync(openedChanksPath, '[]');
});
