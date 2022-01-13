/**
 0. 
 1. 拦截代理请求。
 2. 查看请求是否是需要拦截的请求。
 3. 讲请求去访问接口，如果成功，直接生成数据变成mock,如果失败，填写默认数据。
 4. 生成文件
 */

const url = require("url");
const fs = require("fs-extra");
const Mocker = require('./Mocker')
const convertPath2FileName = require('./convertPath2FileName');
const {
  chalk
} = require("@vue/cli-shared-utils");

module.exports = function webpackDevMocker(app, config) {
  const mocker = new Mocker(config);
  let mockFlag = false;
  app.all("/*", async (req, res, next) => {
    const { method, headers } = req;
    const { referer = "" } = headers; // 页面地址
    const { matchProxyList, mockDir } = mocker;
    // const mockMode = mocker.getModeByMockParam(referer);
    const requestPath = req.path;
    if (requestPath.indexOf(".html") > 0 || requestPath==='/') {
      if (req.query.mock) {
        mockFlag = true;
      } else {
        mockFlag = false;
      }
    }
    if (matchProxyList.length <= 0) {
      return next();
    }

    // 判断当前路由是否需要代理
    const isProxyRoute = mocker.checkIsProxyRoute(requestPath);

    if (!isProxyRoute) {
      return next();
    } else {
      if (!mockFlag){
        return next();
      }
      const mockObj = await mocker.loadMockData();
      // console.log(mockObj)

      // 如果需要mock，直接取mock数据
      const mockKey = `${method} ${requestPath}`;
     
      let mockData = mockObj[mockKey];
      // console.log(mockData)
      // 1. 如果没找到对应mock，先尝试从interface规则取数据，如还拿不到则尝试从线上拉取
      // 2. 如果拿到对应mock，则直接新建mock文件，并写入对应mock文件
      if (!mockData) {
        const fileName = `${convertPath2FileName(requestPath)}.mock.js`;
        const fullFileName = `${method}-${fileName}`;
        const data = await mocker.getDataOLine(req);
        mockData = data;
        const thisMockObj = {
          [mockKey]: data,
        };
        fs.writeFileSync(
          `${mockDir}/${fullFileName}`,
          `module.exports = ${JSON.stringify(thisMockObj, null, 2)}`
        );
        console.log(chalk.yellow(`${mockDir}/${fullFileName}文件创建成功`))
      }
      // await delayRequest(mockData.__delay);
      res.send(JSON.stringify(mockData));

      // next();
    }
  });
};
