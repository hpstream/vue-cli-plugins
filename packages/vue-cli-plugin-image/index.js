const fs = require('fs');
const path = require('path');
const compression = require('./lib/compression');


module.exports = (api, vueOptions) => {

   api.registerCommand(
     'compressImage', {
       description: '压缩图片',
       usage: 'vue-cli-service compressImage',
     },
     () => {
       compression(api, vueOptions)
       
      //  console.log(`👋  Hello compressImage`)
      // //  console.log(api.exitLog)
      //  console.log(vueOptions.compressImage)
     }
   )
}