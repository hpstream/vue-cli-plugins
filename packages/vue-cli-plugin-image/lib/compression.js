const fs = require('fs-extra')
const path = require('path')
const glob = require("glob")
const https = require('https')
const log = require('./log')

module.exports = async function (api, vueOptions) {
  var apath = path.join(process.cwd(), vueOptions.pluginOptions.compressImagePath || 'src/assets');
  var files = await getAllPng(apath);
  files.forEach(async file => {
    await compressPng(path.join(apath, file), vueOptions);
  });

}

// options is optional
function getAllPng(path) {
  return new Promise((res, rej) => {
    glob("**/*.png", {
      cwd: path
    }, function (er, files) {
      if (er) rej(er);
      res(files)
    })
  })
}

function changeRename(file) {
  var obj = path.parse(file);
  // console.log( obj.name.indexOf('.min'))
  if (obj.name.indexOf('.min') < 0) {
    obj.name = obj.name + '.min';
  };
  delete obj.base;
  fs.renameSync(path.join(file), path.join(path.format(obj)))
}
async function compressPng(file, args) {
  var res = await fileUpload(path.join(file));
  await fileUpdate(path.join(file), res);

  if (args.pluginOptions.compressImageIsRename) {
    await changeRename(path.join(file));
  }
}

const options = {
  method: "POST",
  hostname: "tinypng.com",
  path: "/web/shrink",
  headers: {
    rejectUnauthorized: false,
    "Postman-Token": Date.now(),
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
  },
};
// 生成随机IP， 赋值给 X-Forwarded-For
function getRandomIP() {
  return Array.from(Array(4))
    .map(() => parseInt(Math.random() * 255))
    .join(".");
}

// 异步API,压缩图片
function fileUpload(img) {
  return new Promise((resolve, reject) => {
    options.headers["X-Forwarded-For"] = getRandomIP();
    let req = https.request(options, function (res) {
      res.on("data", (buf) => {
        let obj = JSON.parse(buf.toString());
        if (obj.error) {
          // log.danger(obj.error);
        } else {
          // fileUpdate(img, obj)
          resolve(obj)
        }
      });
    });

    req.write(fs.readFileSync(img), "binary");
    req.on("error", (e) => {
      log.danger(e)
    });
    req.end();
  })
}


// 该方法被循环调用,请求图片数据
function fileUpdate(imgpath, obj) {
  return new Promise((resolve, reject) => {
    let options = new URL(obj.output.url);
    let req = https.request(options, (res) => {
      let body = "";
      res.setEncoding("binary");
      res.on("data", function (data) {
        body += data;
      });

      res.on("end", function () {
        fs.writeFile(imgpath, body, "binary", (err) => {
          if (err) return log.danger(err);
          // 将这个成功信息打印在终端内
          const info = `${imgpath} \n 压缩成功，原始大小:${filterSize(obj.input.size)}，压缩大小:${filterSize(obj.output.size)}，优化比例:${toPercent(1-obj.output.ratio)}`;
          log.success(info);
          resolve({
            msg: info
          });
        });

      });
    });
    req.on("error", (e) => {
      log.danger(e)
    });
    req.end();
  })
}


function filterSize(size) {
  if (!size) return '';
  if (size < pow1024(1)) return size + ' B';
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB';
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB';
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB';
  return (size / pow1024(4)).toFixed(2) + ' TB'
}

function toPercent(point) {
  var str = Number(point * 100).toFixed(2);
  str += "%";
  return str;
}

function pow1024(num) {
  return Math.pow(1024, num)
}