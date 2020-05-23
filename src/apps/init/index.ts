import inquirer from 'inquirer';
import tpl from './tpl';
import { writeFileSync, resolvePath, scanf } from '../../helpers/utils';

export const Init = async () => {
  const toolPath = await scanf('小程序命令行工具路径');
  const projectPath = await scanf('项目路径');

  const file = tpl(toolPath, projectPath);

  writeFileSync(resolvePath(process.cwd(), './mpup.config.js'), file);
};
