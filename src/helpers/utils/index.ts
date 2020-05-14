import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import inquirer from 'inquirer';

export const isMacOS = () => {
  return !(/^win/.test(process.platform));
};

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

export const execCmd = (cmd: string, path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: path }, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stdout);
    });
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
