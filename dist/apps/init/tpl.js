"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (toolPath = '', projectPath = '') => {
  return `module.exports = {
  /** 微信开发者工具安装路径 */
  mpToolPath: '${toolPath}',
  /** 项目路径 */
  projectPath: '${projectPath}',

  /** 上传版本 */
  // ver: '',

  /** 上传版本描述 */
  // desc: '',

  /** 执行命令的路径 */
  // execPath: '',

  /** 默认输出命令的结果 */
  // stdout: true,

  /** loading 中的提示文案 */
  // uploadingText: '上传中...',

  /** 上传前执行的命令列表 */
  /**
  commands: [
    {
      // 命令执行前做的事情
      async before() {
        console.log(1);
      },
      // 命令执行后做的事情
      async after(stdout) {
        // console.log(stdout);
      },
      // 命令
      cmd: 'pwd',
      // 执行命令的路径
      execPath: '',
    },
  ],
  * /

  /** 所有命令执行完前 */
  // async beforeExecAllCmd() { },

  /** 所有命令执行完后 */
  // async afterExecAllCmd() { },

  /** 上传前 */
  // async beforeUpload(cmd, projectPath, mpToolPath) {},

  /** 上传完毕 */
  // async done(stdout) {},

  /** 自动输出上传结果 */
  outResult: true,
};
`;
};

exports.default = _default;