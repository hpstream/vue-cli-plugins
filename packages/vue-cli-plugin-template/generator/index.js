let map = {
   tsx: {
     entryFileName: 'App.tsx',
     deleteFiles: (files)=>{
       delete files['src/pages/index/App.vue'];
       delete files['src/pages/index/App1.vue'];   
     }
   },
   ts: {
     entryFileName: 'App.vue',
     deleteFiles: (files) => {
       files['src/pages/index/App.vue'] = files['src/pages/index/App1.vue']
       delete files['src/pages/index/App1.vue'];
       delete files['src/pages/index/App.tsx'];
     }
   },
   js: {
     entryFileName: 'App.vue',
     deleteFiles: (files) => {
      delete files['src/pages/index/App1.vue'];
      delete files['src/pages/index/App.tsx'];
     }
   }
}
module.exports = (api,options) => {
  // api.extendPackage({
  //   dependencies: {
  //     'vue-router-layout': '^0.1.2'
  //   }
  // })
  console.log(options)
 
  api.render('./template', {
    ...options,
    entryFileName: map[options.codeType].entryFileName,
    htmlWebpackPlugin:{
      options:{
        title: 'demo'
      }  
    }
  })

   api.postProcessFiles(files => {
      map[options.codeType].deleteFiles(files)
   })


  //  api.render((files, render) => {
  //    console.log(files);
  //  })
}