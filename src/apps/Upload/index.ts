import config from '../../helpers/get-config/index';
import { MissingOption } from '../../throw/index';
import { asyncFn, execCmd, scanf, cmdJoin, abort } from '../../helpers/utils';
import ora from 'ora';
import 'colors';

export const Upload = async () => {
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
    error: globalError,
  } = config;

  let {
    desc,
    ver,
  } = config;

  const spinner = ora(uploadingText);

  try {
    if (config.ask) {
      if (!ver) {
        ver = await scanf(askVersionText);
        config.ver = ver;
      }
      if (!desc) {
        desc = await scanf(askDescText);
        config.desc = desc;
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
    await asyncFn(beforeExecAllCmd!, {
      config,
      abort,
    });
  
    // 执行所有命令
    for (let i = 0, len = commands!.length; i < len; i++) {
      const {
        before = () => {},
        after = () => {},
        error = () => {},
        cmd,
        execPath = globalExecPath,
        stdout: needOut = globalStdout,
      } = commands![i];
  
      try {
        // 执行命令前的钩子
        await asyncFn(before, {
          config,
          command: commands![i],
          abort,
        });
  
        let stdout = undefined;
        if (cmd) {
          try {
            stdout = await execCmd(cmd!, execPath);
          } catch (e) {
            await asyncFn(error), {
              e,
              abort,
              command: commands![i],
            };

            await asyncFn(globalError!, {
              e,
              abort,
              errorTarget: 'cmd',
              command: commands![i],
            })
          }
        }
  
        if (needOut) {
          console.log(stdout);
        }
  
        // 执行命令后的钩子
        await asyncFn(after, {
          stdout,
          command: commands![i],
          abort,
        });
      } catch (e) {
        asyncFn(globalError!, {
          e,
          abort,
        });
        throw Error(e);
      }
    }
  
    await asyncFn(afterExecAllCmd!, {
      config,
      abort,
    });
  
    const uploadCmd = cmdJoin('upload', `--project=${projectPath} --version=${ver} --desc=${desc}`);

    // 上传前
    await asyncFn(beforeUpload!, {
      uploadCmd,
      config,
      abort,
    });
  
    // loading
    spinner.start();
  
    // 执行上传
    let uploadOut = '';
    try {
      uploadOut = await execCmd(uploadCmd, mpToolPath!);
    } catch (e) {
      console.error(e);
      spinner.stop();
      await asyncFn(globalError!, {
        e,
        abort,
      });
      console.log('检查小程序路径、项目路径是否正确'.red);
      return;
    }
  
    // 停止 loading
    spinner.stop();
    
    // 判断输出结果
    if (outResult) {
      if (uploadOut.includes('error')) {
        console.error(uploadOut.red);
      } else {
        console.log(uploadOut.green);
        spinner.stop();
      }
    }
  
    // 上传完毕钩子
    await asyncFn(done!, {
      stdout: uploadOut,
      config,
      abort,
      cmd: uploadCmd,
    });
  } catch (e) {
    console.error(e);
    asyncFn(globalError!, {
      e,
      abort,
    });
    spinner.stop();
  }
};
