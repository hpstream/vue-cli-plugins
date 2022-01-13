const fs = require('fs-extra')
const path = require('path');
/**
 * 删除某个文件夹下的require 缓存
 * @param  {String} dir 目标文件夹
 * @return {Promise}
 */
function cleanDirRequireCache(dir) {

  return new Promise(async(resolve, reject) => {
    let result = {};
    var files = await fs.readdirSync(dir);
    // console.log(data)
     files.forEach((name) => {
       const filePath = path.join(dir, name)
        delete require.cache[filePath];
     })
     resolve({res: 'success'})
  });
}

module.exports = cleanDirRequireCache;
