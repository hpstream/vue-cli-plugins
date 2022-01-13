const fs = require('fs');
const path = require('path');

function mkDirs(dirPath) {
  if (!fs.existsSync(path.dirname(dirPath))) {
    mkDirs(path.dirname(dirPath));
  }
  try {
    fs.mkdirSync(dirPath);
  } catch (e) {
    console.log(`${dirPath}目录已存在`);
  }
}

module.exports = mkDirs;
