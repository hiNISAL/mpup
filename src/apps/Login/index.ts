import { cmdJoin, execCmd, random, qrDecode, qrEncode, readFileSync, abort, asyncFn } from '../../helpers/utils';
import config from '../../helpers/get-config';
import path from 'path';
import { ChildProcess } from 'child_process';
import 'colors';

export const Login = async () => {
  const { login = {} }= config;

  const {
    qrGot = () => {},
    after = () => {},
    error = () => {},
  } = login;

  const fileName = `__${random()}`;
  const cmd = cmdJoin('login', `-f=base64 -o=${path.resolve(__dirname, `./qr-cache/${fileName}`)}`);

  let childProcess: ChildProcess|null = null;
  let img: string = '';

  const afterLoginQRSave = async () => {
    const base64 = img.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    const res: string = await qrDecode(buffer);

    const qrcode: string = await qrEncode(res);
 
    try {
      await asyncFn(qrGot, {
        terminal: qrcode,
        base64: base64,
        qrContent: res,
        abort,
        config,
      });
    } catch (e) {
      error({
        err: e,
        config,
        abort,
      });
      console.error(e);
    }
  };

  let stdout = '';

  try {
    stdout = await execCmd(cmd, config.mpToolPath!, (pro) => {
      childProcess = pro;
  
      let times = 100;
      const fn = () => {
        times--;
  
        if (times < 0) {
          childProcess?.kill();

          error({
            abort,
            err: '[error] login failed Error: 获取登入二维码失败',
            config,
          });

          return;
        };
        
        try {
          img = readFileSync(path.resolve(__dirname, `./qr-cache/${fileName}`));
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
        config,
        abort,
      });
      return;
    } else {
      stdout = e.toString();
    }
  }
  // 超时算 error
  // if (stdout.startsWith('[error]')) {
  //   error({
  //     err: stdout,
  //     config,
  //     abort,
  //   });
  //   return;
  // }

  // 登入成功
  asyncFn(after, {
    config,
    stdout,
    abort,
  });
};
