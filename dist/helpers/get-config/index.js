"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../args/index"));

var _default2 = _interopRequireDefault(require("../../config/default.config"));

var _utils = require("../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  config,
  ver,
  desc,
  mptool,
  project
} = _index.default;
let customConfig = {};

if (config) {
  try {
    const path = (0, _utils.resolvePath)(process.cwd(), config || '');
    customConfig = require(path);
  } catch (e) {
    customConfig = {};
  }
}

if (ver) {
  customConfig.ver = ver;
}

if (desc) {
  customConfig.desc = desc;
}

if (mptool) {
  customConfig.mpToolPath = mptool;
}

if (project) {
  customConfig.projectPath = project;
}

const defaultConfig = new _default2.default();
const {
  login
} = customConfig;
const {
  login: defaultLoginConfig
} = defaultConfig;
const exportConfig = Object.assign(defaultConfig, customConfig);
exportConfig.login = Object.assign(defaultLoginConfig, login);
var _default = exportConfig;
exports.default = _default;