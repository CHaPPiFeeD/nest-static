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

const puzzleDirPath = path.resolve(__dirname, '../../assets/img/puzzle');

fs.readdir(puzzleDirPath, (err, folders) => {
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    const dirPath = path.resolve(puzzleDirPath, folder);

    fs.readdir(dirPath, (err, files) => {
      const keys = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.includes('full-image')) continue;

        const split = file.split(/[-.]/);
        const row = split[1];
        const column = split[3];
        const userKey = generateKey(10).toString(16);

        keys.push({ row, column, userKey });
      }

      const jsonFolderPath = path.resolve(`${__dirname}/json/${folder}`);
      const keysPath = path.resolve(`${jsonFolderPath}/keys.json`);
      const moneySumPath = path.resolve(`${jsonFolderPath}/money-sum.json`);
      const openedChanksPath = path.resolve(
        `${jsonFolderPath}/opened-chanks.json`,
      );

      if (!fs.existsSync(jsonFolderPath)) {
        fs.mkdirSync(jsonFolderPath, { recursive: true });
      }

      fs.writeFileSync(keysPath, JSON.stringify(keys));
      fs.writeFileSync(openedChanksPath, '[]');
      fs.writeFileSync(moneySumPath, '{"moneySum":0}');
    });
  }
});
