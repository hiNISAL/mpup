import path from 'path';
import fs, { readdirSync, unlinkSync } from 'fs';
import { exec } from 'child_process';
import inquirer from 'inquirer';
import QR from 'qrcode-reader';
import { read as ImageHandler } from 'jimp';
import QRGenerate from 'qrcode-terminal';

export const qrEncode = (content: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    QRGenerate.generate(content, {small: true}, function (qrcode: string) {
      resolve(qrcode);
    });
  });
}

export const qrDecode = (imgBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const decodeQR = new QR();
    
    decodeQR.callback = function(err: any, result: any) {
      if (err) {
        reject(err);

        return;
      }
      if (!result){
        resolve('');
      }else{
        resolve(result.result);
      }
    };

    ImageHandler(imgBuffer, (err: any, image: any) => {
      if (err) {
        reject(err);
        return;
      }
      decodeQR.decode(image.bitmap);
    })
  });
};

export const isMacOS = () => {
  return !(/^win/.test(process.platform));
};

export const cliPrefix = () => {
  return `${isMacOS() ? './' : ''}cli${isMacOS() ? '' : '.bat'} `
};

export const cmdJoin = (...cli: string[]) => {
  return `${cliPrefix()}${cli.join(' ')}`;
};

export const random = () => {
  return Math.random().toString(16).substring(2);
}

export const isAsyncFn = (fn: any) => {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
};

export const resolvePath = (...ps: string[]) => {
  return path.resolve(__dirname, ...ps);
};

export const readFileSync = (path: string) => {
  return fs.readFileSync(path, 'utf-8');
};

export const writeFileSync = (path: string, data: string) => {
  return fs.writeFileSync(path, data);
};

export const relativePath = (p1: string, p2: string) => {
  return path.relative(p1, p2);
};

export const execCmd = (cmd: string, path: string, fn = (process: any) => {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const process = exec(cmd, { cwd: path }, (err, stdout, stderr) => {
        if (stdout) {
          resolve(stdout);
          return;
        }
        reject(err || stderr);
      });

      fn(process);
    } catch (e) {
      reject(e);
    }
  });
};

export const asyncFn = (fn: Function, ...args: any) => {
  if (isAsyncFn(fn)) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await fn(...args));
      } catch (e) {
        reject(e);
      }
    });
  }

  return new Promise((resolve, reject) => {
    try {
      resolve(fn(...args));
    } catch (e) {
      reject(e);
    }
  });
};

export const scanf = async(tip: string) => {
  const { value } = await inquirer.prompt([
    {
      name: 'value',
      type: 'input',
      message: tip.green,
    },
  ]);

  return value;
};

export const abort = (text = '') => {
  console.log(text);
  process.exit();
};

export const clearDir = (dir: string) => {
  const files = readdirSync(dir).map(item => resolvePath(dir, `./${item}`));

  files.forEach((file) => {
    unlinkSync(file);
  });
};
