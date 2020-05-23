"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchApp = void 0;

var _Upload = require("./Upload");

var _Init = require("./Init");

var _args = _interopRequireDefault(require("../args"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAP = {
  UPLOAD: _Upload.Upload,
  INIT: _Init.Init
};

const getApp = app => {
  return MAP[app] || MAP['UPLOAD'];
};

const dispatchApp = () => {
  const appFlag = (_args.default._[0] || '').toLocaleUpperCase();
  const app = getApp(appFlag);
  app();
};

exports.dispatchApp = dispatchApp;