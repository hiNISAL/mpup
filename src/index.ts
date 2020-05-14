import config from './helpers/get-config/index';
import args from './args';
import { MissingOption } from './throw/index';
import { isMacOS, asyncFn, execCmd, scanf } from './helpers/utils';
import init from './apps/init';
import ora from 'ora';
import 'colors';

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
} = config;

let {
  desc,
  ver,
} = config;

try {
  (async () => {
    if (args._[0] === 'init') {
      init();
      return;
    }
  
    if (config.ask) {
      if (!ver) {
        ver = await scanf(askVersionText);
      }
      if (!desc) {
        desc = await scanf(askDescText);
      }
    }
  
    // 判断 mpToolPath 配置项
    if (!mpToolPath) {
      MissingOption('mpToolPath');
    }
  
    // 判断 projectPath 配置项
    if (!projectPath) {
      MissingOption('projectPath');
    }
  
    // 跑所有命令前的钩子
    await asyncFn(beforeExecAllCmd!, config);
  
    // 执行所有命令
    for (let i = 0, len = commands!.length; i < len; i++) {
      const {
        before = () => {},
        after = () => {},
        cmd,
        execPath = globalExecPath,
        stdout: needOut = globalStdout,
      } = commands![i];
  
      try {
        // 执行命令前的钩子
        await asyncFn(before);
  
        let stdout = undefined;
        if (cmd) {
          stdout = await execCmd(cmd!, execPath);
        }
  
        if (needOut) {
          console.log(stdout);
        }
  
        // 执行命令后的钩子
        await asyncFn(after, stdout);
      } catch (e) {
        throw Error(e);
      }
    }
  
    await asyncFn(afterExecAllCmd!);
  
    const uploadCmd = `${isMacOS() ? './' : ''}cli${isMacOS() ? '' : '.bat'} upload --project=${projectPath} --version=${ver} --desc=${desc}`;
  
    // 上传前
    await asyncFn(beforeUpload!, uploadCmd, projectPath, mpToolPath);
  
    // loading
    const spinner = ora(uploadingText).start();
  
    // 执行上传
    let uploadOut = '';
    try {
      uploadOut = await execCmd(uploadCmd, mpToolPath!);
    } catch (e) {
      console.error(e);
      throw Error(e);
    }
  
    // 停止 loading
    spinner.stop();
    
    // 判断输出结果
    if (outResult) {
      if (uploadOut.includes('error')) {
        console.error(uploadOut.red);
      } else {
        console.log(uploadOut.green);
      }
    }
  
    // 上传完毕钩子
    await asyncFn(done!, uploadOut);
  })()
} catch (e) {
  console.error(e);
}
