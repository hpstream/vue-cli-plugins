# `vue-cli-plugin-mock`

> TODO: description

## Usage

```
const vueCliPluginMock = require('vue-cli-plugin-mock');

// TODO: DEMONSTRATE API
```


``` js
module.exports = {
  devServer: {
    open: true,
    port: 8080,
    publicPath: "/",
    inline: true,
    proxy: { // 配置代理
      "/hp": {
        target: "https://xxx.immomo.com/",
        changeOrigin: true
      }
    }
  },
  crossorigin: "anonymous",
  pluginOptions: {
    matchProxyList: ["/hp"], // mock插件的路由
    mock: true, //开启mock插件
  }
};

```