const chalk = require('chalk');
var log = require('single-line-log').stdout;

exports.danger = function (str) {
  console.log(chalk.red(str))
}

exports.success = function (str) {
  console.log(chalk.green(str))
}

exports.progressStatus = function (str) {
  log(str);
}
