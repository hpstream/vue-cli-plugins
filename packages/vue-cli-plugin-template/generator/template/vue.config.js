module.exports = {
	productionSourceMap: false,
	publicPath: "",
	lintOnSave: true,
	assetsDir: "./static",
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
			}
			
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
