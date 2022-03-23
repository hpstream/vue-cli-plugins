const fs = require('fs');
const path = require('path');

function getEntryPages() {
  const result = {};
  try {
    const pagesPath = path.resolve(process.cwd(), './src/pages');
    if (fs.existsSync(pagesPath)) {
      fs.readdirSync(pagesPath)
        .filter((item) => item.indexOf('.') !== 0)
        .forEach((item) => {
          result[item] = {
            // page 的入口
            entry: `src/pages/${item}/index.ts`,
            // 模板来源
            template: `src/pages/${item}/index.html`,
            // 在 dist/index.html 的输出
            filename: `${item}.html`,
          };
        });
    }
  } catch (e) {
    console.log(e.message); // eslint-disable-line
  }
  return result;
}
module.exports = (api, vueOptions) => {
  const pages = getEntryPages();
  vueOptions.pages = pages;
}