module.exports = pkg => {
    const notice = 'PostCSS, Autoprefixer and CSS Modules are supported by default'
  const prompts = [{
    name: 'codeType',
    type: 'list',
    message: `使用哪种方式写代码？`,
    description: `${notice}.`,
    choices: [{
        name: 'vue(js)',
        value: 'js'
      },
      {
        name: 'vue(ts)',
        value: 'ts'
      },
      {
        name: 'vue(tsx)',
        value: 'tsx'
      }
    ]
  }]


  return prompts
}