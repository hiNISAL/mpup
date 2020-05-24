"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = void 0;

var _utils = require("../../helpers/utils");

var _getConfig = _interopRequireDefault(require("../../helpers/get-config"));

var _path = _interopRequireDefault(require("path"));

require("colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Login = async () => {
  const {
    login = {}
  } = _getConfig.default;
  const {
    qrGot = () => {},
    after = () => {},
    error = () => {}
  } = login;
  const fileName = `__${(0, _utils.random)()}`;
  const cmd = (0, _utils.cmdJoin)('login', `-f=base64 -o=${_path.default.resolve(__dirname, `./qr-cache/${fileName}`)}`);
  (0, _utils.clearDir)((0, _utils.resolvePath)(__dirname, './qr-cache'));
  let childProcess = null;
  let img = '';

  const afterLoginQRSave = async () => {
    const base64 = img.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    const res = await (0, _utils.qrDecode)(buffer);
    const qrcode = await (0, _utils.qrEncode)(res);

    try {
      await (0, _utils.asyncFn)(qrGot, {
        terminal: qrcode,
        base64: base64,
        qrContent: res,
        abort: _utils.abort,
        config: _getConfig.default
      });
    } catch (e) {
      error({
        err: e,
        config: _getConfig.default,
        abort: _utils.abort
      });
      console.error(e);
    }
  };

  let stdout = '';

  try {
    stdout = await (0, _utils.execCmd)(cmd, _getConfig.default.mpToolPath, pro => {
      childProcess = pro;
      let times = 100;

      const fn = () => {
        times--;

        if (times < 0) {
          var _childProcess;

          (_childProcess = childProcess) === null || _childProcess === void 0 ? void 0 : _childProcess.kill();
          error({
            abort: _utils.abort,
            err: '[error] login failed Error: 获取登入二维码失败',
            config: _getConfig.default
          });
          return;
        }

        ;

        try {
          img = (0, _utils.readFileSync)(_path.default.resolve(__dirname, `./qr-cache/${fileName}`));
          times = -1;
          afterLoginQRSave();
        } catch (e) {
          setTimeout(() => {
            fn();
          }, 300);
        }
      };

      fn();
    });
  } catch (e) {
    if (!e.toString().split('\n').join('').split(' ').join('').includes('waitingforscanandlogin✔login')) {
      error({
        err: e,
        config: _getConfig.default,
        abort: _utils.abort
      });
      return;
    } else {
      stdout = e.toString();
    }
  } // 超时算 error


  if (stdout.startsWith('[error]')) {
    error({
      err: stdout,
      config: _getConfig.default,
      abort: _utils.abort
    });
    return;
  } // 登入成功


  (0, _utils.asyncFn)(after, {
    config: _getConfig.default,
    stdout,
    abort: _utils.abort
  });
};

exports.Login = Login;