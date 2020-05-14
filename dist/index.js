"use strict";

var _index = _interopRequireDefault(require("./helpers/get-config/index"));

var _args = _interopRequireDefault(require("./args"));

var _index2 = require("./throw/index");

var _utils = require("./helpers/utils");

var _init = _interopRequireDefault(require("./apps/init"));

var _ora = _interopRequireDefault(require("ora"));

require("colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  mpToolPath,
  projectPath,
  desc,
  ver,
  beforeExecAllCmd,
  afterExecAllCmd,
  commands,
  execPath: globalExecPath = process.cwd(),
  stdout: globalStdout = true,
  beforeUpload,
  uploadingText,
  outResult,
  done
} = _index.default;

(async () => {
  if (_args.default._[0] === 'init') {
    (0, _init.default)();
    return;
  } // 判断 mpToolPath 配置项


  if (!mpToolPath) {
    (0, _index2.MissingOption)('mpToolPath');
  } // 判断 projectPath 配置项


  if (!projectPath) {
    (0, _index2.MissingOption)('projectPath');
  } // 跑所有命令前的钩子


  await (0, _utils.asyncFn)(beforeExecAllCmd, _index.default); // 执行所有命令

  for (let i = 0, len = commands.length; i < len; i++) {
    const {
      before = () => {},
      after = () => {},
      cmd,
      execPath = globalExecPath,
      stdout: needOut = globalStdout
    } = commands[i];

    try {
      // 执行命令前的钩子
      await (0, _utils.asyncFn)(before);
      let stdout = undefined;

      if (cmd) {
        stdout = await (0, _utils.execCmd)(cmd, execPath);
      }

      if (needOut) {
        console.log(stdout);
      } // 执行命令后的钩子


      await (0, _utils.asyncFn)(after, stdout);
    } catch (e) {
      throw Error(e);
    }
  }

  await (0, _utils.asyncFn)(afterExecAllCmd);
  const uploadCmd = `${(0, _utils.isMacOS)() ? './' : ''}cli${(0, _utils.isMacOS)() ? '' : '.bat'} upload --project=${projectPath} --version=${ver} --desc=${desc}`; // 上传前

  await (0, _utils.asyncFn)(beforeUpload, uploadCmd, projectPath, mpToolPath); // loading

  const spinner = (0, _ora.default)(uploadingText).start(); // 执行上传

  let uploadOut = '';

  try {
    uploadOut = await (0, _utils.execCmd)(uploadCmd, mpToolPath);
  } catch (e) {
    throw Error(e);
  } // 停止 loading


  spinner.stop(); // 判断输出结果

  if (outResult) {
    if (uploadOut.includes('error')) {
      console.error(uploadOut.red);
    } else {
      console.log(uploadOut.green);
    }
  } // 上传完毕钩子


  await (0, _utils.asyncFn)(done, uploadOut);
})();