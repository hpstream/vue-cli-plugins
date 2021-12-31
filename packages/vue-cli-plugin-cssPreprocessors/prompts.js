module.exports = pkg => {
    const notice = 'PostCSS, Autoprefixer and CSS Modules are supported by default'
  const prompts = [{
    name: 'cssPreprocessor',
    type: 'list',
    message: `Pick a CSS pre-processor${process.env.VUE_CLI_API_MODE ? '' : ` (${notice})`}:`,
    description: `${notice}.`,
    choices: [{
        name: 'Sass/SCSS (with dart-sass)',
        value: 'dart-sass'
      },
      {
        name: 'Less',
        value: 'less'
      },
      {
        name: 'Stylus',
        value: 'stylus'
      }
    ]
  }]


  return prompts
}