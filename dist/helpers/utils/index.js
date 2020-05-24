"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearDir = exports.abort = exports.scanf = exports.asyncFn = exports.execCmd = exports.relativePath = exports.writeFileSync = exports.readFileSync = exports.resolvePath = exports.isAsyncFn = exports.random = exports.cmdJoin = exports.cliPrefix = exports.isMacOS = exports.qrDecode = exports.qrEncode = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireWildcard(require("fs"));

var _child_process = require("child_process");

var _inquirer = _interopRequireDefault(require("inquirer"));

var _qrcodeReader = _interopRequireDefault(require("qrcode-reader"));

var _jimp = require("jimp");

var _qrcodeTerminal = _interopRequireDefault(require("qrcode-terminal"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const qrEncode = content => {
  return new Promise((resolve, reject) => {
    _qrcodeTerminal.default.generate(content, {
      small: true
    }, function (qrcode) {
      resolve(qrcode);
    });
  });
};

exports.qrEncode = qrEncode;

const qrDecode = imgBuffer => {
  return new Promise((resolve, reject) => {
    const decodeQR = new _qrcodeReader.default();

    decodeQR.callback = function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      if (!result) {
        resolve('');
      } else {
        resolve(result.result);
      }
    };

    (0, _jimp.read)(imgBuffer, (err, image) => {
      if (err) {
        reject(err);
        return;
      }

      decodeQR.decode(image.bitmap);
    });
  });
};

exports.qrDecode = qrDecode;

const isMacOS = () => {
  return !/^win/.test(process.platform);
};

exports.isMacOS = isMacOS;

const cliPrefix = () => {
  return `${isMacOS() ? './' : ''}cli${isMacOS() ? '' : '.bat'} `;
};

exports.cliPrefix = cliPrefix;

const cmdJoin = (...cli) => {
  return `${cliPrefix()}${cli.join(' ')}`;
};

exports.cmdJoin = cmdJoin;

const random = () => {
  return Math.random().toString(16).substring(2);
};

exports.random = random;

const isAsyncFn = fn => {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
};

exports.isAsyncFn = isAsyncFn;

const resolvePath = (...ps) => {
  return _path.default.resolve(__dirname, ...ps);
};

exports.resolvePath = resolvePath;

const readFileSync = path => {
  return _fs.default.readFileSync(path, 'utf-8');
};

exports.readFileSync = readFileSync;

const writeFileSync = (path, data) => {
  return _fs.default.writeFileSync(path, data);
};

exports.writeFileSync = writeFileSync;

const relativePath = (p1, p2) => {
  return _path.default.relative(p1, p2);
};

exports.relativePath = relativePath;

const execCmd = (cmd, path, fn = process => {}) => {
  return new Promise((resolve, reject) => {
    try {
      const process = (0, _child_process.exec)(cmd, {
        cwd: path
      }, (err, stdout, stderr) => {
        if (stdout) {
          resolve(stdout);
          return;
        }

        reject(err || stderr);
      });
      fn(process);
    } catch (e) {
      reject(e);
    }
  });
};

exports.execCmd = execCmd;

const asyncFn = (fn, ...args) => {
  if (isAsyncFn(fn)) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await fn(...args));
      } catch (e) {
        reject(e);
      }
    });
  }

  return new Promise((resolve, reject) => {
    try {
      resolve(fn(...args));
    } catch (e) {
      reject(e);
    }
  });
};

exports.asyncFn = asyncFn;

const scanf = async tip => {
  const {
    value
  } = await _inquirer.default.prompt([{
    name: 'value',
    type: 'input',
    message: tip.green
  }]);
  return value;
};

exports.scanf = scanf;

const abort = (text = '') => {
  console.log(text);
  process.exit();
};

exports.abort = abort;

const clearDir = dir => {
  const files = (0, _fs.readdirSync)(dir).map(item => resolvePath(dir, `./${item}`));
  files.forEach(file => {
    (0, _fs.unlinkSync)(file);
  });
};

exports.clearDir = clearDir;