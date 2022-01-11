module.exports = {
	productionSourceMap: false,
	publicPath: "",
	lintOnSave: true,
	assetsDir: "./static",
	pages: {
		index: {
			// page 的入口
			entry: 'src/pages/index/index.ts',
			// 模板来源
			template: 'src/pages/index/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'live demo',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		}
	},
	devServer: {
		host: "local.m.immomo.com",
		open: true,
		port: 8080,
		publicPath: "/",
		inline: true,
		allowedHosts: ["local.m.immomo.com"],
		proxy: {
			"/mk": {
				target: "https://live-api.immomo.com/",
				changeOrigin: true,
			},
			"/m": {
				target: "https://live-web.immomo.com/",
				changeOrigin: true,
			},
			"/javabiz": {
				target: "https://live-web.immomo.com/",
				changeOrigin: true,
			},
			"/javaactivity": {
				target: "https://live-web.immomo.com/",
				changeOrigin: true,
			},
		},
	},
	crossorigin: "anonymous",
	pluginOptions: {
		disableInjectIMDevTools: false,
		disableCompressImage: false,
		ignoreChunkVendors: [],
		matchProxyList: ["/javaactivity", "/download"],
		ignoreInjectMKTool: [],
		ifHideMKTool: false,
		injectIMDevTools: [],
		projectType: "fe-live-projects",
		dllType: "",
		useLMP: "",
		mock: true,
		tinify: "",
		works: true,
	},
};
