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
  beforeExecAllCmd,
  afterExecAllCmd,
  commands,
  execPath: globalExecPath = process.cwd(),
  stdout: globalStdout = true,
  beforeUpload,
  uploadingText,
  outResult,
  done,
  askVersionText = '',
  askDescText = '',
  error: globalError
} = _index.default;
let {
  desc,
  ver
} = _index.default;

const abort = (text = '') => {
  console.log(text);
  process.exit();
};

const spinner = (0, _ora.default)(uploadingText);

try {
  (async () => {
    if (_args.default._[0] === 'init') {
      (0, _init.default)();
      return;
    }

    if (_index.default.ask) {
      if (!ver) {
        ver = await (0, _utils.scanf)(askVersionText);
        _index.default.ver = ver;
      }

      if (!desc) {
        desc = await (0, _utils.scanf)(askDescText);
        _index.default.desc = desc;
      }
    } // 判断 mpToolPath 配置项


    if (!mpToolPath) {
      (0, _index2.MissingOption)('mpToolPath');
    } // 判断 projectPath 配置项


    if (!projectPath) {
      (0, _index2.MissingOption)('projectPath');
    } // 跑所有命令前的钩子


    await (0, _utils.asyncFn)(beforeExecAllCmd, {
      config: _index.default,
      abort
    }); // 执行所有命令

    for (let i = 0, len = commands.length; i < len; i++) {
      const {
        before = () => {},
        after = () => {},
        error = () => {},
        cmd,
        execPath = globalExecPath,
        stdout: needOut = globalStdout
      } = commands[i];

      try {
        // 执行命令前的钩子
        await (0, _utils.asyncFn)(before, {
          config: _index.default,
          command: commands[i],
          abort
        });
        let stdout = undefined;

        if (cmd) {
          try {
            stdout = await (0, _utils.execCmd)(cmd, execPath);
          } catch (e) {
            await (0, _utils.asyncFn)(error), {
              e,
              abort,
              command: commands[i]
            };
            await (0, _utils.asyncFn)(globalError, {
              e,
              abort,
              errorTarget: 'cmd',
              command: commands[i]
            });
          }
        }

        if (needOut) {
          console.log(stdout);
        } // 执行命令后的钩子


        await (0, _utils.asyncFn)(after, {
          stdout,
          command: commands[i],
          abort
        });
      } catch (e) {
        (0, _utils.asyncFn)(globalError, {
          e,
          abort
        });
        throw Error(e);
      }
    }

    await (0, _utils.asyncFn)(afterExecAllCmd, {
      config: _index.default,
      abort
    });
    const uploadCmd = `${(0, _utils.isMacOS)() ? './' : ''}cli${(0, _utils.isMacOS)() ? '' : '.bat'} upload --project=${projectPath} --version=${ver} --desc=${desc}`; // 上传前

    await (0, _utils.asyncFn)(beforeUpload, {
      uploadCmd,
      config: _index.default,
      abort
    }); // loading

    spinner.start(); // 执行上传

    let uploadOut = '';

    try {
      uploadOut = await (0, _utils.execCmd)(uploadCmd, mpToolPath);
    } catch (e) {
      console.error(e);
      spinner.stop();
      await (0, _utils.asyncFn)(globalError, {
        e,
        abort
      });
      console.log('检查小程序路径、项目路径是否正确'.red);
      return;
    } // 停止 loading


    spinner.stop(); // 判断输出结果

    if (outResult) {
      if (uploadOut.includes('error')) {
        console.error(uploadOut.red);
      } else {
        console.log(uploadOut.green);
        spinner.stop();
      }
    } // 上传完毕钩子


    await (0, _utils.asyncFn)(done, {
      stdout: uploadOut,
      config: _index.default,
      abort
    });
  })();
} catch (e) {
  console.error(e);
  (0, _utils.asyncFn)(globalError, {
    e,
    abort
  });
  spinner.stop();
}