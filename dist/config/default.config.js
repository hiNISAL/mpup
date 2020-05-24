"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class DefaultConfig {
  constructor() {
    // 微信开发者工具安装路径
    this.mpToolPath = ''; // 项目路径

    this.projectPath = ''; // 本次上传的代码的描述

    this.desc = ''; // 本次上传代码的版本号

    this.ver = ''; // 每次上传前询问版本和描述

    this.ask = true;
    /** 每次询问版本号的提示文案 */

    this.askVersionText = '版本号';
    /** 每次询问版本描述的提示文案 */

    this.askDescText = '版本描述'; // 默认输出命令结果

    this.stdout = false;
    this.uploadingText = '小程序代码上传中...'; // 执行命令的路径

    this.execPath = ''; // 上传前执行的命令列表

    this.commands = [];
    this.outResult = true;
    /** 服务端上传相关 */
    // 和远端校验的 token

    this.token = ''; // 远端地址

    this.remote = ''; // 是否启用服务端上传

    this.useServerUpload = false; // 登入相关配置

    this.login = {
      after() {},

      qrGot() {},

      error() {}

    };
  } // 出错


  async error() {} // 所有命令执行完前


  async beforeExecAllCmd() {}

  // 所有命令执行完后
  async afterExecAllCmd() {}

  // 上传前
  async beforeUpload() {}

  // 上传完毕
  async done() {}

}

exports.default = DefaultConfig;
;