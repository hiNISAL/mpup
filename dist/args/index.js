"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const yargs = require('yargs');

const argv = yargs.usage('mpup [options]').option('config', {
  describe: '上传配置',
  type: 'string'
}).option('ver', {
  describe: '本次上传代码的版本号',
  type: 'string'
}).option('desc', {
  describe: '本次上传代码的描述',
  type: 'string'
}).option('mptool', {
  describe: '小程序开发者工具命令行工具所在目录',
  type: 'string'
}).option('project', {
  describe: '项目目录',
  type: 'string'
}).help('help').argv;
var _default = argv;
exports.default = _default;