"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tpl = _interopRequireDefault(require("./tpl"));

var _utils = require("../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async () => {
  const toolPath = await (0, _utils.scanf)('项目路径');
  const projectPath = await (0, _utils.scanf)('小程序命令行工具路径');
  const file = (0, _tpl.default)(toolPath, projectPath);
  (0, _utils.writeFileSync)((0, _utils.resolvePath)(process.cwd(), './mpup.config.js'), file);
};

exports.default = _default;