const axios = require("axios");
const chokidar = require("chokidar");
const fs = require("fs-extra");
const { chalk } = require("@vue/cli-shared-utils");
const path = require("path");

const cleanDirRequireCache = require("./cleanDirRequireCache");
// const collectMockFiles = require('./collectMockFiles');
// const parseBody = require('./parseRequestBody');
// const mkDirs = require('./mkdirs');
// const parseURLParam = require('./parseURLParam');

class Mocker {
  constructor({
    devServer = {},
    mockDir = process.cwd(),
    matchProxyList = [],
    mockParam = "mock",
  }) {
    this.devServer = devServer;
    this.mockDir = mockDir;
    this.matchProxyList = matchProxyList;
    this.mockParam = mockParam;
    this.mockObj = {};
    // this.watchMockFileChange();
    // mkDirs(this.mockDir);
  }

  // 监听mock文件变化
  watchMockFileChange() {
    const watcher = chokidar.watch(this.mockDir);
    watcher.on("all", async () => this.loadMockData());
  }

  async loadMockData() {
    // 清除缓存后重新加载mock数据
    if (this.mockDir) {
      const cleanResult = await cleanDirRequireCache(this.mockDir);
      if (cleanResult) {
        await this.assignMockData();
      }
    }
    return this.mockObj;
  }

  // 组装mock对象
  async assignMockData() {
    const result = {};
    var files = await fs.readdirSync(this.mockDir);

    files.forEach((name) => {
      const filePath = path.join(this.mockDir, name);
      // console.log(name)
      try {
        let data = require(filePath);
        // result[filePath] = data;
        Object.assign(result, data);
      } catch (e) {
        console.log(chalk.yellow(`${filePath} 语法解析错误`));
        // console.log(chalk.yellow(e));
      }
    });

    this.mockObj = result;
  }

  // 检测是否是需要代理的路由
  checkIsProxyRoute(currentRoute) {
    return this.matchProxyList.some((item) => currentRoute.startsWith(item));
  }

  // 从实际接口拉取数据
  async getDataOLine(req) {
    let proxy = this.devServer.proxy;
    const { method } = req;
    const requestPath = req.path;
    let apiDomain = "";
    if (proxy) {
      Object.keys(proxy).forEach((key) => {
        if (requestPath.indexOf(key) > -1) {
          apiDomain = proxy[key].target;
          console.log(apiDomain)
        }
      });
    }
    const baseURL = apiDomain;
    // const { req } = await parseBody(oriRequest);
  
    // console.log(requestPath);
    const { data } = await axios({
      method,
      baseURL,
      url: `${requestPath}`,
      params: method === "GET" ? req.query : req.body,
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    }).catch((res) => {
      if (!res.response) {
        res.response = {
          data: {},
        };
      }
      return {
        data: {
          code: res.response.data.status,
          msg: res.response.data.error || "mock抓取线上数据失败",
          data: {},
        },
      };
    });
    // data.__delay = 0;
    return data;
  }
}

module.exports = Mocker;
