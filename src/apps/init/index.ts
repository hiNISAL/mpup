import inquirer from 'inquirer';
import tpl from './tpl';
import { writeFileSync, resolvePath } from '../../helpers/utils';

const getProjectPath = async () => {
  const { projectPath } = await inquirer.prompt([
    {
      name: 'projectPath',
      type: 'input',
      message: '项目路径'.green,
    },
  ]);

  return projectPath;
}

const getToolsPath = async () => {
  const { toolsPath } = await inquirer.prompt([
    {
      name: 'toolsPath',
      type: 'input',
      message: '小程序命令行工具路径'.green,
    },
  ]);

  return toolsPath;
}

export default async () => {
  const toolPath = await getToolsPath();
  const projectPath = await getProjectPath();

  const file = tpl(toolPath, projectPath);

  writeFileSync(resolvePath(process.cwd(), './mpup.config.js'), file);
};
