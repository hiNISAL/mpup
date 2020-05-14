"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanf = exports.asyncFn = exports.execCmd = exports.relativePath = exports.writeFileSync = exports.readFileSync = exports.resolvePath = exports.isAsyncFn = exports.isMacOS = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _child_process = require("child_process");

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isMacOS = () => {
  return !/^win/.test(process.platform);
};

exports.isMacOS = isMacOS;

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

const execCmd = (cmd, path) => {
  return new Promise((resolve, reject) => {
    try {
      (0, _child_process.exec)(cmd, {
        cwd: path
      }, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err);
          return;
        }

        resolve(stdout);
      });
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