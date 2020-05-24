module.exports = {
  /** 微信开发者工具安装路径 */
  /** MacOS默认安装路径： /Applications/wechatwebdevtools.app/Contents/MacOS */
  /** windows默认安装路径： C:\Program Files (x86)\Tencent\微信web开发者工具 */
  mpToolPath: '/Applications/wechatwebdevtools.app/Contents/MacOS',

  /** 项目路径 */
  projectPath: './',

  /** 本次要上传的代码版本号 */
  // ver: '',

  /** 本次要上传的代码描述 */
  // desc: '',

  /** 每次上传前询问版本和描述 */
  // ask: true,

  /** 每次询问版本号的提示文案 */
  // askVersionText: '版本号',

  /** 每次询问版本描述的提示文案 */
  // askDescText: '版本描述',

  /** 执行命令的路径 */
  // execPath: '',

  /** 默认输出命令的结果 */
  // stdout: false,

  /** 上传中的 loading 文案 */
  // uploadingText: '',

  /** 上传前执行的命令列表 */
  /**
  commands: [
    {
      // 出错做的事
      async error({e, command, abort}) {},
      // 命令执行前做的事情
      async before({config, command, abort}) {},
      // 命令执行后做的事情
      async after({ abort, command, stdout }) {},
      // 命令
      cmd: '',
      // 执行命令的路径 优先级比上一层的 execPath 高
      execPath: '',
    },
  ],
  */

  /** 所有命令执行完前 */
  // async beforeExecAllCmd({ config, abort }) {},

  /** 所有命令执行完后 */
  // async afterExecAllCmd({ config, abort }) {},

  /** 上传前 */
  // async beforeUpload({ uploadCmd, config, abort }) {},

  /** 上传完毕 */
  // async done({ stdout, config, abort }) {},

  /** 出错时做的事情 如果时在执行命令列表中的命令过程中出错 会提供 errorTarget 和 command */
  // async error({ e, abort, errorTarget, command }) {},

  /** 自动输出结果 */
  // outResult: true,

  /** 登入相关配置 */
  login: {
    qrGot({ terminal, base64, qrContent }) {
      console.log(terminal);
    },

    after({ stdout }) {
      console.log(stdout);
    },

    error({ err }) {
      console.log(err);
    }
  },
};
