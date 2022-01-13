function convertPath2FileName(pathStr = '') {
  return pathStr.split('/').reverse().join('-');
}

module.exports = convertPath2FileName;
