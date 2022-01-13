const path = require('path');
const webpackDevMocker = require('./lib');

module.exports = (api, vueOptions) => {
  const {
    mock,
    matchProxyList
  } = vueOptions.pluginOptions || {};
  if (mock) {

    vueOptions.devServer.before = (app) => {
      webpackDevMocker(app, {
        matchProxyList: (Array.isArray(matchProxyList) ? matchProxyList : []),
        devServer: vueOptions.devServer||{},
        mockDir: path.resolve(process.cwd(), './__mock__'),
        mockParam: 'mock',
      });
    };
  }
};
