module.exports = pkg => {
  const prompts = [{
    name: 'cssPreprocessor',
    when: answers => answers.features.includes('css-preprocessor'),
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