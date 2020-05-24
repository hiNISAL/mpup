"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = void 0;

var _index = _interopRequireDefault(require("../../helpers/get-config/index"));

var _index2 = require("../../throw/index");

var _utils = require("../../helpers/utils");

var _ora = _interopRequireDefault(require("ora"));

require("colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Upload = async () => {
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
  const spinner = (0, _ora.default)(uploadingText);

  try {
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
      abort: _utils.abort
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
          abort: _utils.abort
        });
        let stdout = undefined;

        if (cmd) {
          try {
            stdout = await (0, _utils.execCmd)(cmd, execPath);
          } catch (e) {
            await (0, _utils.asyncFn)(error), {
              e,
              abort: _utils.abort,
              command: commands[i]
            };
            await (0, _utils.asyncFn)(globalError, {
              e,
              abort: _utils.abort,
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
          abort: _utils.abort
        });
      } catch (e) {
        (0, _utils.asyncFn)(globalError, {
          e,
          abort: _utils.abort
        });
        throw Error(e);
      }
    }

    await (0, _utils.asyncFn)(afterExecAllCmd, {
      config: _index.default,
      abort: _utils.abort
    });
    const uploadCmd = (0, _utils.cmdJoin)('upload', `--project=${projectPath} --version=${ver} --desc=${desc}`); // 上传前

    await (0, _utils.asyncFn)(beforeUpload, {
      uploadCmd,
      config: _index.default,
      abort: _utils.abort
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
        abort: _utils.abort
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
      abort: _utils.abort
    });
  } catch (e) {
    console.error(e);
    (0, _utils.asyncFn)(globalError, {
      e,
      abort: _utils.abort
    });
    spinner.stop();
  }
};

exports.Upload = Upload;