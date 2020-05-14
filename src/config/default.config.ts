import { iCommand, iConfig } from '../common.d';

export default class DefaultConfig implements iConfig {
  // 微信开发者工具安装路径
  mpToolPath: string = '';
  // 项目路径
  projectPath: string = '';

  // 本次上传的代码的描述
  desc: string = '';

  // 本次上传代码的版本号
  ver: string = '';

  // 每次上传前询问版本和描述
  ask: boolean = true;

  /** 每次询问版本号的提示文案 */
  askVersionText: string = '版本号';

  /** 每次询问版本描述的提示文案 */
  askDescText: string = '版本描述';

  // 默认输出命令结果
  stdout: boolean = false;

  uploadingText: string = '小程序代码上传中...';

  // 执行命令的路径
  execPath: string = '';

  // 上传前执行的命令列表
  commands: iCommand[] = [];

  // 出错
  async error() {}

  // 所有命令执行完前
  async beforeExecAllCmd() {};

  // 所有命令执行完后
  async afterExecAllCmd() {};

  // 上传前
  async beforeUpload() {};

  // 上传完毕
  async done() {};

  outResult: boolean = true;

  /** 服务端上传相关 */

  // 和远端校验的 token
  token: string = '';

  // 远端地址
  remote: string = '';

  // 是否启用服务端上传
  useServerUpload: boolean = false;
};
