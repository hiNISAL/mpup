module.exports = {
  // 微信开发者工具安装路径
  mpToolPath: '',

  // 项目路径
  projectPath: '',

  // 本次要上传的代码版本号
  ver: '',

  // 本次要上传的代码描述
  desc: '',

  ask: true,

  // 执行命令的路径
  execPath: '',

  // 默认输出命令的结果
  stdout: false,

  // 上传中的 loading 文案
  uploadingText: '上传中...',

  // 上传前执行的命令列表
  commands: [
    {
      // 命令执行前做的事情
      async before() {},
      // 命令执行后做的事情
      async after(stdout) {},
      // 命令
      cmd: '',
      // 执行命令的路径 优先级比上一层的 execPath 高
      execPath: '',
    },
  ],

  // 所有命令执行完前
  async beforeExecAllCmd(config) {},

  // 所有命令执行完后
  async afterExecAllCmd() {},

  // 上传前
  async beforeUpload(cmd, projectPath, mpToolPath) {},

  // 上传完毕
  async done(stdout) {},

  // 自动输出结果
  outResult: true,
};
