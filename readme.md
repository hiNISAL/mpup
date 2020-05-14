# mpup

微信小程序代码上传辅助工具，可处理前置操作，实现自动化上传工作流，理论支持任何微信小程序项目。

<center><img src="https://raw.githubusercontent.com/hiNISAL/mpup/master/doc-assets/images/cover.gif" style="max-width: 600px"></center>

利用[小程序开发者工具命令行工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)提供的能力实现。

小程序开发者工具提供的命令行工具所在路径：

```bash
macOS: <安装路径>/Contents/MacOS/cli

Windows: <安装路径>/cli.bat
```

通常 macOS 下命令行工具的默认目录是 `/Applications/wechatwebdevtools.app/Contents/MacOS`。
windows 下命令行工具的默认陌路是 `C:\\Program Files (x86)\\Tencent\\微信web开发者工具`。

此工具适合小程序代码上传前需要许多前置工作的项目，如需要编译、修改环境配置、跑钩子等。

## 安装

```bash
npm install mpup -D

// 全局安装
npm install mpup -g
```

## 使用

```bash
npx mpup --project=项目路径 --mptool=小程序命令行工具所在路径 --ver=上传代码的版本号
```

## 必要的前置工作

1. 打开小程序的服务端口，(小程序开发者工具 => 设置 => 安全设置 => 开启服务端口)
2. 使用较新稳定版的开发者工具，测试中发现老的稳定版本、 RC 版本和 Nightly Build 版本的命令行工具可能无法运行
3. 登入开发者工具，且登入的账户拥有项目的上传代码权限

## 配置文件

### 生成配置文件

```bash
npx mpup init
```

### 配置详情

```js
module.exports = {
  // 微信开发者工具安装路径
  mpToolPath: '',

  // 项目路径
  projectPath: '',

  // 本次要上传的代码版本号
  ver: '',

  // 本次要上传的代码描述
  desc: '',

  /** 每次上传询问版本和版本描述 优先级会低于配置项和参数 */
  ask: false,

  /** 每次上传前询问版本和版本描述 */
  askVersionText: '版本号',

  /** 每次询问版本描述的提示文案 */
  askDescText: '版本描述',

  // 执行命令的路径
  execPath: '',

  // 默认输出命令的结果
  stdout: false,

  // 上传中的 loading 文案
  uploadingText: '上传中...',

  // 上传前执行的命令列表
  commands: [
    {
      // 自动输出执行结果
      stdout: false,
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
```

## 结合小程序框架使用

利用 `commands` 配置项，可以做一些自动化的流程。

小程序框架通常需要编译作为前置步骤。

```js
module.exports = {
  // ...
  commands: [
    {
      // 命令
      cmd: 'npm run build',
      // 执行命令的路径 优先级比上一层的 execPath 高
      execPath: '项目所在地址',
    },
  ],
  // ...
}
```

## 多个小程序上传代码

暂时不支持，可以写脚本批量调用工具。

命令行工具支持 `project` 参数，其他配置可以共用一个配置文件。

```js
// 示例代码
const { execSync } = require('child_process');

const projects = [
  '项目1',
  '项目2',
  '项目3',
];

projects.forEach((project) => {
  execSync(`mpup --config=配置路径 --project=${project}`);
});
```
