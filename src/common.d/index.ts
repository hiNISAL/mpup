export interface iCommand {
  // 命令执行前做的事情
  before?: Function;
  // 命令执行后做的事情
  after?: Function;
  // 出错的时候做的事情
  error?: Function;
  // 命令
  cmd?: string;
  // 执行命令的路径
  execPath?: string;
  /** 默认输出命令结果 */
  stdout?: boolean;
}

export interface iConfig {
  /** 微信开发者工具安装路径 */
  mpToolPath?: string;

  /** 默认输出命令结果 */
  stdout?: boolean;

  /** 项目路径 */
  projectPath?: string;

  /** 每次上传前询问版本和版本描述 */
  ask?: boolean;

  /** 每次询问版本号的提示文案 */
  askVersionText?: string;

  /** 每次询问版本描述的提示文案 */
  askDescText?: string;

  /** 本次上传的代码的描述 */
  desc?: string,

  /** 本次上传代码的版本号 */
  ver?: string,

  /** 上传中的文案 */
  uploadingText?: string;

  /** 执行命令的路径 */
  execPath?: string;
  
  /** 上传前执行的命令列表 */
  commands?: iCommand[];

  /** 所有命令执行完前 */
  beforeExecAllCmd?: Function;

  /** 所有命令执行完后 */
  afterExecAllCmd?: Function;

  /** 上传前 */
  beforeUpload?: Function;

  /** 上传完毕 */
  done?: Function;

  /** 出错时 */
  error?: Function;

  /** 自动输出上传结果 */
  outResult?: boolean;

  /** 和远端校验的 token */
  token?: string;

  /** 远端地址 */
  remote?: string;

  /** 是否启用服务端上传 */
  useServerUpload?: boolean;
}
