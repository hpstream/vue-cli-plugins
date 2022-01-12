let map = {
   tsx: {
     entryFileName: './App.tsx',
     deleteFiles: (files)=>{
       delete files['src/pages/index/App.vue'];
       delete files['src/pages/index/App1.vue'];   
     }
   },
   ts: {
     entryFileName: './App.vue',
     deleteFiles: (files) => {
       files['src/pages/index/App.vue'] = files['src/pages/index/App1.vue']
       delete files['src/pages/index/App1.vue'];
       delete files['src/pages/index/App.tsx'];
     }
   },
   js: {
     entryFileName: './App.vue',
     deleteFiles: (files) => {
      delete files['src/pages/index/App1.vue'];
      delete files['src/pages/index/App.tsx'];
     }
   }
}
function addExtendPackage(api) {
   api.extendPackage({
     "scripts": {
       "serve": "vue-cli-service serve",
       "build": "vue-cli-service dynamicBuild",
       "lint": "vue-cli-service lint",
       "compressImage": "vue-cli-service compressImage",
       "format": "onchange 'src/**/*.js' 'src/**/*.vue' 'src/**/*.ts' 'src/**/*.html' -- prettier --write {{changed}}",
       "generate": "vue invoke @live/generate"
     },
     "dependencies": {
       "axios": "^0.24.0",
       "core-js": "^3.6.5",
       "vue": "^2.6.12",
       "vue-class-component": "^7.2.5",
       "vue-property-decorator": "^9.0.0",
       "vuex": "^3.5.1",
       "vuex-class": "^0.3.2"
     },
     "devDependencies": {
       "@typescript-eslint/eslint-plugin": "^4.18.0",
       "@typescript-eslint/parser": "^4.18.0",
       "@vue/cli-plugin-babel": "~4.5.0",
       "@vue/cli-plugin-eslint": "~4.5.0",
       "@vue/cli-plugin-typescript": "~4.5.0",
       "@vue/cli-service": "~4.5.0",
       "@vue/eslint-config-airbnb": "^5.0.2",
       "@vue/eslint-config-typescript": "^7.0.0",
       "babel-plugin-component": "^1.1.1",
       "cz-conventional-changelog": "^3.3.0",
       "eslint": "^6.7.2",
       "eslint-config-prettier": "^7.1.0",
       "eslint-plugin-import": "^2.20.2",
       "eslint-plugin-prettier": "^3.3.0",
       "eslint-plugin-vue": "^6.2.2",
       "onchange": "^7.1.0",
       "prettier": "^2.2.1",
       "sass": "^1.26.5",
       "sass-loader": "^8.0.2",
       "typescript": "~4.1.5",
       "vue-template-compiler": "^2.6.11"
     },
     "eslintConfig": {
       "root": true,
       "env": {
         "node": true
       },
       "extends": [
         "plugin:vue/essential",
         "@vue/airbnb",
         "@vue/typescript/recommended",
         "prettier",
         "prettier/@typescript-eslint",
         "prettier/vue",
         "plugin:prettier/recommended",
         "eslint-config-prettier"
       ],
       "parserOptions": {
         "ecmaVersion": 2020
       },
       "rules": {
         "prettier/prettier": "error",
         "generator-star-spacing": "off"
       }
     },
     "browserslist": [
       "> 1%",
       "last 2 versions",
       "not dead",
       "last 20 versions"
     ],
     "config": {
       "commitizen": {
         "path": "./node_modules/cz-conventional-changelog"
       }
     }
   })
}
module.exports = (api, options, rootOptions) => {

  api.assertCliVersion(">= 4.5.0");
  const PROJECT_NAME = rootOptions.projectName;
  console.log(rootOptions)

  addExtendPackage(api);
  api.render('./template', {
    ...options,
    entryFileName: map[options.codeType].entryFileName,
    htmlWebpackPlugin:{
      options:{
        title: PROJECT_NAME
      }  
    }
  })

   api.postProcessFiles(files => {
      map[options.codeType].deleteFiles(files)
   })

}

module.exports.hooks = (api) => {
  api.afterInvoke(() => {
        // 屏蔽 generator 之后的文件写入操作
    console.log(1111)
  })
}