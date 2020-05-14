"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _tpl = _interopRequireDefault(require("./tpl"));

var _utils = require("../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getProjectPath = async () => {
  const {
    projectPath
  } = await _inquirer.default.prompt([{
    name: 'projectPath',
    type: 'input',
    message: '项目路径'.green
  }]);
  return projectPath;
};

const getToolsPath = async () => {
  const {
    toolsPath
  } = await _inquirer.default.prompt([{
    name: 'toolsPath',
    type: 'input',
    message: '小程序命令行工具路径'.green
  }]);
  return toolsPath;
};

var _default = async () => {
  const toolPath = await getToolsPath();
  const projectPath = await getProjectPath();
  const file = (0, _tpl.default)(toolPath, projectPath);
  (0, _utils.writeFileSync)((0, _utils.resolvePath)(process.cwd(), './mpup.config.js'), file);
};

exports.default = _default;