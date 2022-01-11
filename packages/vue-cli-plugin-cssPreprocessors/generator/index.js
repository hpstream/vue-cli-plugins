module.exports = (api,options) => {
  // api.extendPackage({
  //   dependencies: {
  //     'vue-router-layout': '^0.1.2'
  //   }
  // })
  console.log(options)
  api.render('./template', {
    ...options,
    htmlWebpackPlugin:{
      options:{
        title: 'demo'
      }  
    }
  })
}